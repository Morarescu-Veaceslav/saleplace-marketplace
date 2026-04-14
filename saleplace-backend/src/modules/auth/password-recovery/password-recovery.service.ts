import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { GraphQLError } from 'graphql';
import { generateToken } from 'src/shared/utils/generate-token.util';
import { TokenType } from '@prisma/generated';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { Request } from 'express';
import { NewPasswordInput } from './inputs/new-password.input';
import { hash } from 'argon2';

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService
    ) { }


    public async resetPassword(
        req: Request,
        input: ResetPasswordInput,
        userAgent: string
    ) {
        const { email } = input

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            },
            // include: {
            //     notificationSettings: true
            // }
        })

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'RESET_PASSWORD_ERROR',
                },
            });
        }

        const resetToken = await generateToken(this.prismaService, user, TokenType.PASSWORD_RESET)

        const metadata = getSessionMetadata(req, userAgent)

        await this.mailService.sendPasswordResetToken(user.email, resetToken.token, metadata)

        return true
    }



    public async newPassword(input: NewPasswordInput) {
        const { password, token } = input

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token,
                type: TokenType.PASSWORD_RESET
            }
        })

        if (!existingToken || !existingToken.userId) {
            throw new GraphQLError('Token invalid or expired', {
                extensions: {
                    code: 'INVALID_TOKEN',
                },
            });
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) {

            throw new GraphQLError('Token invalid or expired.', {
                extensions: {
                    code: 'INVALID_TOKEN',
                },
            });
        }

        await this.prismaService.$transaction([
            this.prismaService.user.update({
                where: { id: existingToken.userId },
                data: { password: await hash(password) }
            }),
            this.prismaService.token.deleteMany({
                where: {
                    userId: existingToken.userId,
                    type: TokenType.PASSWORD_RESET
                }
            })
        ]);

        return true
    }

}
