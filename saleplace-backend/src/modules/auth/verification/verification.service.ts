import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { VerificationInput } from './inputs/verification.input';
import { TokenType, User } from '@prisma/generated';
import { GraphQLError } from 'graphql';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { saveSession } from 'src/shared/utils/session.util';
import { generateToken } from 'src/shared/utils/generate-token.util';
import { RedisService } from 'src/core/redis/redis.service';


@Injectable()
export class VerificationService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly redisService: RedisService
    ) { }

    public async verify(
        req: Request,
        input: VerificationInput,
        userAgent: string
    ): Promise<User> {
        const { token } = input

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token,
                type: TokenType.EMAIL_VERIFY
            }
        })

        if (!existingToken || !existingToken.userId) {
            throw new GraphQLError('Token is not associated with any user.', {
                extensions: {
                    code: 'TOKEN_IS_NOT_ASSOCIATED'
                }
            });
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) {
            throw new GraphQLError('Token has expired.', {
                extensions: {
                    code: 'TOKEN_HAS_EXPIRED'
                }
            });
        }

        const user = await this.prismaService.user.update({
            where: {
                id: existingToken.userId
            },
            data: {
                isEmailVerified: true
            }

        })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.EMAIL_VERIFY
            }
        })

        const metadata = getSessionMetadata(req, userAgent)

        saveSession(req, user, metadata, this.redisService.client)

        return user

    }

    public async sendVerificationToken(user: User) {

        const verificationToken = await generateToken(
            this.prismaService,
            user,
            TokenType.EMAIL_VERIFY,
        )

        await this.mailService.sendVerificationToken(user.email, verificationToken.token)

        return true
    }

}
