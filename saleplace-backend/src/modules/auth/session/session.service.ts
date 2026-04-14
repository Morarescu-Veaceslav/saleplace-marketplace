import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginInput } from './inputs/login.input';
import { GraphQLError } from 'graphql';
import { verify } from 'argon2';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { RedisService } from 'src/core/redis/redis.service';
import { UserSession } from 'src/shared/types/user-session.types';
import { destroySession, saveSession } from 'src/shared/utils/session.util';
import { VerificationService } from '../verification/verification.service';
import { TOTP } from 'otpauth'
import { RemoveSession } from './models/session.mode';
import { PresenceService } from 'src/modules/chat/presence.service';


@Injectable()
export class SessionService {

    private readonly logger = new Logger(SessionService.name);

    public constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
        private readonly verificationService: VerificationService,
        private readonly presenceService: PresenceService
    ) { }


    public async findByUser(req: Request) {

        const userId = req.session.userId;
        if (!userId) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'USER_NOT_FOUND',
                },
            });
        }

        const sessionKeys = await this.redisService.client.smembers(`user:sessions:${userId}`);
        if (!sessionKeys.length) return []
        const userSessions: UserSession[] = [];

        for (const key of sessionKeys) {
            const sessionData = await this.redisService.client.get(key);
            if (!sessionData) continue;

            try {
                const session = JSON.parse(sessionData);
                if (session.userId === userId) {
                    userSessions.push({ ...session, id: key.split(':')[1] });
                }
            } catch {
                continue;
            }
        }

        userSessions.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return userSessions.filter(session => session.id !== req.session.id);
    }

    public async findCurrent(req: Request) {

        const sessionId = req.sessionID;

        const sessionKey = `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`;

        const sessionData = await this.redisService.client.get(sessionKey);

        if (!sessionData) {
            throw new GraphQLError('Session not found', {
                extensions: {
                    code: 'SESSION_NOT_FOUND',
                },
            });
        }

        let session;

        try {
            session = JSON.parse(sessionData);
        } catch (err) {
            throw new GraphQLError('Session data is corrupted', {
                extensions: { code: 'SESSION_CORRUPTED_ERROR' },
            });
        }

        return {
            ...session,
            id: sessionId
        }
    }

    public async login(req: Request, input: LoginInput, userAgent: string) {

        const { login, password, pin } = input

        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { username: { equals: login } },
                    { email: { equals: login } }
                ]
            }
        })

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                },
            });
        }

        const isValidPassword = await verify(user.password, password)

        if (!isValidPassword) {
            throw new GraphQLError('Incorrect password', {
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                },
            });
        }

        if (!user.isEmailVerified) {
            await this.verificationService.sendVerificationToken(user)
            throw new GraphQLError('Your email address is not verified. Please check your email inbox — we have sent a new confirmation link', {
                extensions: {
                    code: 'EMAIL_NOT_VERIFIED',
                },
            });
        }

        if (user.isTotpEnabled) {
            if (!pin) {
                return {
                    message: 'TOTP authentication code is required to continue'
                }
            }

            if (!user.totpSecret) {
                throw new GraphQLError('TOTP secret is missing for this user', {
                    extensions: {
                        code: 'LOGIN_ERROR_TOTP',
                    },
                });

            }

            const totp = new TOTP({
                issuer: 'SalaPlace',
                label: `${user.email}`,
                algorithm: 'SHA1',
                digits: 6,
                secret: user.totpSecret
            })

            const delta = totp.validate({ token: pin })

            if (delta === null) {
                throw new GraphQLError('The TOTP code is invalid or has expired', {
                    extensions: {
                        code: 'LOGIN_ERROR_TOTP',
                    },
                });
            }
        }

        if (user.isDeactivated) {
            throw new GraphQLError('Account is deactivated', {
                extensions: {
                    code: 'ACCOUNT_DEACTIVATED',
                },
            })
        }

        const metadata = getSessionMetadata(req, userAgent)

        return saveSession(req, user, metadata, this.redisService.client)
    }

    public async logout(req: Request) {
        const userId = req.session.userId!;
        await this.presenceService.markOffline(userId);
        return destroySession(req, this.configService, this.redisService.client);
    }

    public async clearSessionCookie(req: Request): Promise<boolean> {
        req.session?.destroy(() => { });
        req.res?.clearCookie(
            this.configService.getOrThrow<string>('SESSION_NAME')
        )
        return true
    }


    public async removeSession(req: Request, id: string): Promise<RemoveSession> {

        if (req.session.id === id) {
            throw new GraphQLError('You cannot delete the current session', {
                extensions: {
                    code: 'SESSION_REMOVE_ERROR',
                },
            });
        }

        const sessionKey = `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`;

        const sessionData = await this.redisService.client.get(sessionKey);

        if (!sessionData) {
            throw new GraphQLError('Session not found.', {
                extensions: { code: 'SESSION_NOT_FOUND' },
            });
        }

        const session = JSON.parse(sessionData);

        const userSessionsKey = `user:sessions:${session.userId}`;
        const orderedKey = `user:sessions:ordered:${session.userId}`;

        try {
            await this.redisService.client.multi()
                .del(sessionKey)
                .srem(userSessionsKey, sessionKey)
                .zrem(orderedKey, sessionKey)
                .exec();

        } catch (e) {
            this.logger.warn(
                'Failed to remove session index:', e
            );
        }

        return {
            success: true,
            removedSessionId: id,
            userId: session.userId
        }
    }
}
