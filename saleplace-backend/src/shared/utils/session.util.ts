import type { Request } from "express";
import type { SessionMetadata } from "../types/session-metadata.types";
import type { User } from "@prisma/generated";
import { ConfigService } from "@nestjs/config";
import { GraphQLError } from 'graphql';
import Redis from "ioredis";

export async function saveSession(
    req: Request,
    user: User,
    metadata: SessionMetadata,
    redisClient: Redis
) {

    await new Promise<User>((resolve, reject) => {
        req.session.createdAt = new Date()
        req.session.userId = user.id
        req.session.metadata = metadata

        req.session.save(err => {
            if (err) {
                return reject(
                    new GraphQLError('The session could not be saved.', {
                        extensions: {
                            code: 'SESSION_SAVE_FAILED',
                        },
                    }),
                );
            }

            resolve(user)
        })
    })

    const sessionKey = `sessions:${req.sessionID}`
    const userSessionsKey = `user:sessions:${user.id}`
    const orderedKey = `user:sessions:ordered:${user.id}`
    const now = Date.now()
    const MAXSESSIONS = 3

    try {

        const count = await redisClient.zcard(orderedKey)

        if (count >= MAXSESSIONS) {

            const [oldestSession] = await redisClient.zrange(orderedKey, 0, 0)

            if (oldestSession) {
                await redisClient
                    .multi()
                    .del(oldestSession)
                    .srem(userSessionsKey, oldestSession)
                    .zrem(orderedKey, oldestSession)
                    .exec();
            }
        }

        await redisClient
            .multi()
            .sadd(userSessionsKey, sessionKey)
            .zadd(orderedKey, now, sessionKey)
            .exec()

    } catch (e) {
        console.warn('Session index failed', e)
    }

    return {
        user,
        message: 'Login successful.',
    };

}


export function destroySession(
    req: Request,
    configService: ConfigService,
    redisClient: Redis
) {
    return new Promise((resolve, reject) => {
        const sessionId = req.sessionID
        const userId = req.session.userId

        req.session.destroy(err => {
            if (err) {
                return reject(
                    new GraphQLError('The session could not be destroyed.', {
                        extensions: { code: 'SESSION_DESTROY_FAILED' },
                    }),
                );
            }

            req.res?.clearCookie(configService.getOrThrow<string>('SESSION_NAME'));
            resolve(true);
        });

        if (userId && sessionId) {
            const sessionKey = `sessions:${sessionId}`
            const userSetKey = `user:sessions:${userId}`
            const orderedKey = `user:sessions:ordered:${userId}`

            try {
                 redisClient
                    .multi()
                    .srem(userSetKey, sessionKey)
                    .zrem(orderedKey, sessionKey)
                    .exec();
            } catch (e) {
                console.warn('Failed to cleanup session index:', e)
            }
        }
    });
}
