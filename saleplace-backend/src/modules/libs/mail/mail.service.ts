import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { VerificationTemplate } from './templates/verification.template';
import type { SessionMetadata } from '@shared/session-metadata.types';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';
import { DeactivateTemplate } from './templates/deactivate.template';
import { AccountDeletionTemplate } from './templates/account-deletion.template';
import { CheckoutTemplate } from './templates/checkout.template';
import { SendCheckoutEmail } from './interfaces/send-checkout-email.interface';
import { SendRefundEmail } from './interfaces/send-refund-email.interface';
import { RefundTemplate } from './templates/refund.template';
import { InvoiceTemplateProps } from './interfaces/invoice.iterface';
import { InvoiceTemplate } from './templates/invoice-template';

@Injectable()
export class MailService {
    public constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) { }


    public async sendVerificationToken(email: string, token: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

        const html = await render(VerificationTemplate({ domain, token }))

        return this.sendMail(email, 'Account Verification', html)
    }

    public async sendPasswordResetToken(
        email: string,
        token: string,
        metadata: SessionMetadata
    ) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(PasswordRecoveryTemplate({ domain, token, metadata }))

        return this.sendMail(email, 'Reset Password', html)
    }

    public async sendDeactivateToken(
        email: string,
        token: string,
        metadata: SessionMetadata
    ) {
        const html = await render(DeactivateTemplate({ token, metadata }))
        return this.sendMail(email, 'Account Deletion Request', html)
    }

    public async sendAccountDeletion(email: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(AccountDeletionTemplate({ domain }))
        return this.sendMail(email, 'Account Deletion Confirmation', html)
    }

    public async sendCheckout({
        to,
        orderId,
        productName,
        price,
        currency,
        transactionId,
    }: SendCheckoutEmail) {

        const html = await render(
            CheckoutTemplate({
                orderId,
                productName,
                price,
                currency,
                transactionId,
            }),
        );

        return this.sendMail(to, 'Payment successful', html);
    }

    public async sendInvoice({
        to,
        invoiceId,
        planName,
        amount,
        currency,
        periodStart,
        periodEnd,
        invoiceUrl,
        invoicePdf,
        issuedAt,
    }: InvoiceTemplateProps) {
        const html = await render(
            InvoiceTemplate({
                to,
                invoiceId,
                planName,
                amount,
                currency,
                periodStart,
                periodEnd,
                invoiceUrl,
                invoicePdf,
                issuedAt,
            })
        )

        await this.sendMail(to, `Your SalePlace Invoice`, html,);
    }

    public async sendRefundReceipt({
        to,
        orderId,
        productName,
        price,
        currency,
        refundId,
    }: SendRefundEmail) {
        const html = await render(
            RefundTemplate({
                orderId,
                productName,
                price,
                currency,
                refundId,
            }),
        );

        return this.sendMail(to, 'Refund completed – SalePlace', html);
    }

    private sendMail(email: string, subject: string, html: string) {
        return this.mailerService.sendMail({
            to: email,
            subject,
            html
        })
    }
}
