import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/generated';
import { randomBytes } from 'crypto';
import { encode } from 'hi-base32';
import { TOTP } from 'otpauth';
import * as  QRCode from 'qrcode'
import { PrismaService } from 'src/core/prisma/prisma.service';
import { EnableTotpInput } from './inputs/enable-totp.input';
import { GraphQLError } from 'graphql';
import { TotpDisable } from './models/totp.disable';
import { TotpEnable } from './models/totp.enable';


@Injectable()
export class TotpService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async generate(user: User): Promise<{ qrcodeUrl: string; secret: string }> {
        const secret = encode(randomBytes(15))
            .replace(/=/g, '')
            .substring(0, 24)

        const totp = new TOTP({
            issuer: 'SalePlace',
            label: `${user.email}`,
            algorithm: 'SHA1',
            digits: 6,
            secret
        })

        const otpauthUrl = totp.toString()
        const qrcodeUrl = await QRCode.toDataURL(otpauthUrl)

        return { qrcodeUrl, secret }

    }

    public async enable(user: User, input: EnableTotpInput): Promise<TotpEnable> {

        const { secret, pin } = input

        const totp = new TOTP({
            issuer: 'SalePlace',
            label: `${user.email}`,
            algorithm: 'SHA1',
            digits: 6,
            secret
        })

        const delta = totp.validate({ token: pin })

        if (delta === null) {
            throw new GraphQLError('The TOTP code is invalid or has expired.', {
                extensions: {
                    code: 'TOTP_CODE_ERROR',
                },
            });
        }

        // const encryptedSecret = cryptoService.encrypt(secret)
        // const secret = cryptoService.decrypt(user.totpSecret)

        const enable = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                isTotpEnabled: true,
                totpSecret: secret
            },
            select: {
                id: true,
                isTotpEnabled: true
            }
        })

        return enable
    }

    public async disable(user: User): Promise<TotpDisable> {

        const disable = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                isTotpEnabled: false,
                totpSecret: null
            },
            select: {
                id: true,
                isTotpEnabled: true
            }
        })

        return disable
    }
}
