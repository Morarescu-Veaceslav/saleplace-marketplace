import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenType, type User } from '@prisma/generated';
import { type Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { GraphQLError } from 'graphql';
import { RedisService } from 'src/core/redis/redis.service';
import { destroySession } from 'src/shared/utils/session.util';
import { generateToken } from 'src/shared/utils/generate-token.util';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { verify } from 'argon2';
import { SessionService } from '../session/session.service';
import { DeactivateAccountResult } from './models/deactivate.model';
@Injectable()
export class DeactivateService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        private readonly sessionService: SessionService
    ) { }


    public async deactivate(
        req: Request,
        input: DeactivateAccountInput,
        user: User,
        userAgent: string
    ): Promise<DeactivateAccountResult> {
        const { email, password, pin } = input

        if (user.email !== email) {
            throw new GraphQLError('Incorrect email address', {
                extensions: {
                    code: 'INVALID_EMAIL',
                },
            });
        }

        const isValidPassword = await verify(user.password, password)

        if (!isValidPassword) {
            throw new GraphQLError('Incorrect password', {
                extensions: {
                    code: 'INVALID_PASSWORD',
                },
            });
        }

        if (!pin) {
            await this.sendDeactivateToken(req, user, userAgent)
            return {
                success: false,
                message: 'VERIFICATION_REQUIRED',
            }
        }

        await this.validateDeactivateToken(req, pin, user.id)
        this.sessionService.clearSessionCookie(req)

        return {
            success: true,
            message: 'ACCOUNT_DEACTIVATED',
            userId: user.id,
            deactivatedAt: new Date(),
        }
    }


    private async validateDeactivateToken(req: Request, token: string, userId: string): Promise<boolean> {

        const existingToken = await this.prismaService.token.findFirst({
            where: {
                token,
                type: TokenType.DEACTIVATE_ACCOUNT,
                userId,
            },
        });

        if (!existingToken) {
            throw new GraphQLError('Token not found', {
                extensions: {
                    code: 'TOKEN_NOT_FOUND',
                },
            });
        }

        if (existingToken.expiresIn < new Date()) {
            throw new GraphQLError('Verification failed', {
                extensions: { code: 'TOKEN_EXPIRED' },
            });
        }

        await this.prismaService.$transaction(async tx => {
            await tx.user.update({
                where: { id: userId },
                data: {
                    isDeactivated: true,
                    deactivatedAt: new Date(),
                },
            });

            await tx.token.delete({
                where: { id: existingToken.id },
            });
        });

        await this.clearSession(userId)

        //await this.sessionService.clearSessionCookie(req)

        return true

    }


    private async sendDeactivateToken(
        req: Request,
        user: User,
        userAgent: string
    ): Promise<boolean> {

        const deactivateToken = await generateToken(
            this.prismaService,
            user,
            TokenType.DEACTIVATE_ACCOUNT,
            false
        )

        const metadata = getSessionMetadata(req, userAgent)

        await this.mailService.sendDeactivateToken(
            user.email,
            deactivateToken.token,
            metadata
        )

        return true
    }


    private async clearSession(userId: string) {
        const userSetKey = `user:sessions:${userId}`;
        const orderedKey = `user:sessions:ordered:${userId}`;

        const sessionKeys = await this.redisService.client.smembers(userSetKey);

        const multi = this.redisService.client.multi();

        for (const key of sessionKeys) {
            multi.del(key);
        }

        multi.del(userSetKey);
        multi.del(orderedKey);

        await multi.exec();
    }

}

