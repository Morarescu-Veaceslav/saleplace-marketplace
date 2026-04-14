import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from '../libs/stripe/stripe.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Prisma } from '@prisma/generated';
import { CheckoutEmailQueue } from '../email/queues/email-checkout.queue';
import { EventbusService } from 'src/core/eventbus/eventbus.service';
import { ORDER_PAID_EVENT } from '../notifications/events/checkout/checkout.events';
import { GraphQLError } from 'graphql';
import { ORDER_REFUNDED_EVENT } from '../notifications/events/refund/refund.event';
import { RefundEmailQueue } from '../email/queues/email-refund.queue';
import { ORDER_REFUNDED_FAILED_EVENT } from '../notifications/events/refundFailed/refund-failed.event';
import { InvoiceEmailQueue } from '../email/queues/email-invoice.queue';
import { INVOICE_PAID_EVENT } from '../notifications/events/invoice/invoice.events';
import { SUBSCRIPTION_CANCELED_EVENT } from '../notifications/events/subscriptionCanceled/subscription-canceled.event';

@Injectable()
export class WebhookService {

    private readonly logger = new Logger(WebhookService.name)

    constructor(
        private readonly stripeService: StripeService,
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly checkoutEmailQueue: CheckoutEmailQueue,
        private readonly invoiceEmailQueue: InvoiceEmailQueue,
        private readonly eventBus: EventbusService,
        private readonly refundEmailQueue: RefundEmailQueue,
    ) { }

    //  Stripe signature verification
    constructStripeEvent(payload: Buffer, signature: string): Stripe.Event {
        return this.stripeService.client.webhooks.constructEvent(
            payload,
            signature,
            this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET'),
        );
    }

    private handlers: Record<string, (obj: any, tx: Prisma.TransactionClient) => Promise<void>> = {
        'checkout.session.completed': async (obj, tx) => {
            const session = obj as Stripe.Checkout.Session;

            if (session.metadata?.type === 'PAYMENT') {
                await this.onCheckoutSessionCompleted(session, tx);
            }

            if (session.metadata?.type === 'SUBSCRIPTION') {
                await this.onSubscriptionCheckoutCompleted(session, tx);
            }
        },
        'invoice.payment_succeeded': async (obj, tx) => {
            await this.onInvoicePaid(obj as Stripe.Invoice, tx);
        },
        'customer.subscription.updated': async (obj, tx) => {
            await this.handleStripeCancel(obj as Stripe.Subscription, tx);
        },
        'customer.subscription.deleted': async (obj, tx) => {
            await this.onSubscriptionDelete(obj as Stripe.Subscription, tx);
        },
        'payment_intent.payment_failed': async (obj, tx) => {
            await this.onPaymentFailed(obj as Stripe.PaymentIntent, tx);
        },
        'payment_intent.canceled': async (obj, tx) => {
            await this.onPaymentCanceled(obj as Stripe.PaymentIntent, tx);
        },
        'refund.updated': async (obj, tx) => {
            const refund = obj as Stripe.Refund;

            if (refund.status === 'succeeded') {
                await this.onRefundCompleted(refund, tx);
            }

            if (refund.status === 'failed') {
                await this.onRefundFailed(refund, tx);
            }
        },
    };

    async handleStripeEvent(event: Stripe.Event) {
        await this.prismaService.$transaction(async (tx) => {

            const exists = await tx.stripeEvent.findUnique({
                where: { eventId: event.id },
            });
            if (exists) return;

            const handler = this.handlers[event.type];
            if (handler) {
                await handler(event.data.object, tx);
            }

            await tx.stripeEvent.create({
                data: {
                    eventId: event.id,
                    type: event.type,
                },
            });
        });
    }

    private async onCheckoutSessionCompleted(
        session: Stripe.Checkout.Session,
        tx: Prisma.TransactionClient,
    ) {

        if (session.metadata?.type !== 'PAYMENT') return

        const orderId = session.metadata?.orderId;
        const paymentIntentId = session.payment_intent as string;

        if (!orderId || !paymentIntentId) {
            throw new GraphQLError('Missing orderId or paymentIntentId', {
                extensions: { code: 'ORDER_OR_PAYMENT_NOT_FOUND' },
            });
        }

        await tx.transaction.update({
            where: { orderId },
            data: {
                stripePaymentIntentId: paymentIntentId,
                status: 'SUCCESS',
            },
        })

        const order = await tx.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
            select: {
                productId: true,
                buyerId: true,
                sellerId: true
            }
        })

        await tx.product.update({
            where: { id: order.productId },
            data: { status: 'SOLD' },
        })

        await this.checkoutEmailQueue.sendReceipt(orderId)

        this.eventBus.emit(ORDER_PAID_EVENT, {
            orderId,
            buyerId: order.buyerId,
            sellerId: order.sellerId,
            productId: order.productId,
        });

    }

    private async onSubscriptionCheckoutCompleted(
        session: Stripe.Checkout.Session,
        tx: Prisma.TransactionClient,
    ) {

        if (session.metadata?.type !== 'SUBSCRIPTION') return

        const userId = session.metadata.userId;
        const planId = session.metadata.planId;

        if (!session.subscription) {
            throw new Error('Missing subscription id from Stripe session');
        }

        const subscription = await this.stripeService.client.subscriptions.retrieve(
            session.subscription as string);

        if (!subscription.latest_invoice) {
            throw new Error('Missing latest invoice on subscription');
        }

        const invoice = await this.stripeService.client.invoices.retrieve(
            subscription.latest_invoice as string,
        );

        const periodEnd = invoice.lines.data[0].period.end;
        const periodStart = invoice.lines.data[0].period.start;
        const stripeItem = subscription.items.data[0];

        const subscriptionRecord = await tx.subscription.upsert({
            where: { userId },

            create: {
                userId,
                planId,
                stripeSubscriptionId: subscription.id,
                status: subscription.status === 'active' ? 'ACTIVE' : 'INACTIVE',
                currentPeriodStart: new Date(periodStart * 1000),
                currentPeriodEnd: new Date(periodEnd * 1000),
                interval: stripeItem?.price?.recurring?.interval ?? null,
                productsUsed: 0,
            },

            update: {
                planId,
                status: subscription.status === 'active' ? 'ACTIVE' : 'INACTIVE',
                currentPeriodStart: new Date(periodStart * 1000),
                currentPeriodEnd: new Date(periodEnd * 1000),
                interval: stripeItem?.price?.recurring?.interval ?? null,
                productsUsed: 0,
            },
        });

        await tx.invoice.updateMany({
            where: {
                stripeSubscriptionId: subscription.id,
                subscriptionId: null,
            },
            data: {
                subscriptionId: subscriptionRecord.id,
                userId: subscriptionRecord.userId,
            },
        });

    }

    private async onInvoicePaid(
        invoice: Stripe.Invoice,
        tx: Prisma.TransactionClient,
    ) {

        if (invoice.status !== 'paid') return;

        const user = await tx.user.findUnique({
            where: { stripeCustomerId: invoice.customer as string },
            select: { id: true },
        });

        if (!user) {
            this.logger.warn(`User not found for invoice ${invoice.id}`)
        }

        const stripeSubscriptionId = this.getStripeSubscriptionIdFromInvoice(invoice);

        const subscription = stripeSubscriptionId
            ? await tx.subscription.findUnique({
                where: { stripeSubscriptionId },
                select: { id: true },
            })
            : null;

        const invoiceRecord = await tx.invoice.upsert({
            where: { stripeInvoiceId: invoice.id },

            create: {
                stripeInvoiceId: invoice.id,
                stripeCustomerId: invoice.customer as string,
                stripeSubscriptionId,

                subscriptionId: null,
                userId: user?.id ?? null,

                amountPaid: invoice.amount_paid,
                currency: invoice.currency,
                status: 'PAID',
                billingReason: invoice.billing_reason ?? null,

                periodStart: invoice.period_start
                    ? new Date(invoice.period_start * 1000)
                    : null,
                periodEnd: invoice.period_end
                    ? new Date(invoice.period_end * 1000)
                    : null,

                invoiceUrl: invoice.hosted_invoice_url,
                invoicePdf: invoice.invoice_pdf,

                paidAt: invoice.status_transitions?.paid_at
                    ? new Date(invoice.status_transitions.paid_at * 1000)
                    : null,
            },

            update: {
                status: 'PAID',
                paidAt: invoice.status_transitions?.paid_at
                    ? new Date(invoice.status_transitions.paid_at * 1000)
                    : undefined,

                subscriptionId: subscription?.id ?? undefined,
                userId: user?.id ?? undefined,
            },
        });

        if (subscription) {
            await tx.subscription.update({
                where: { id: subscription.id },
                data: { productsUsed: 0 },
            });
        }

        await this.invoiceEmailQueue.sendInvoice(invoiceRecord.id)

        this.eventBus.emit(INVOICE_PAID_EVENT, {
            invoiceId: invoiceRecord.id,
            userId: invoiceRecord.userId!,
            subscriptionId: invoiceRecord.subscriptionId
        });
        
    }

    private async handleStripeCancel(stripeSub: Stripe.Subscription, tx: Prisma.TransactionClient) {

        const subscription = await tx.subscription.findUnique({
            where: { stripeSubscriptionId: stripeSub.id }
        });

        if (!subscription) return;

        await tx.subscription.update({
            where: { id: subscription.id },
            data: {
                status: stripeSub.cancel_at_period_end ? 'CANCELED_PENDING' : 'CANCELED',
                canceledAtPeriodEnd: true,
            },
        });

        this.eventBus.emit(SUBSCRIPTION_CANCELED_EVENT,
            {
                userId: subscription.userId,
                subscriptionId: subscription.id,
                canceledAtPeriodEnd: stripeSub.cancel_at_period_end,
                currentPeriodEnd: subscription.currentPeriodEnd,
            },
        );
    }

    private async onRefundFailed(refund: Stripe.Refund, tx: Prisma.TransactionClient) {

        const transaction = await tx.transaction.findUnique({
            where: {
                stripePaymentIntentId: refund.payment_intent as string,
            },
            include: {
                order: true,
            },
        });

        if (!transaction) return

        if (transaction.status === 'REFUND_FAILED') return

        await tx.transaction.update({
            where: { id: transaction.id },
            data: {
                status: 'REFUND_FAILED',
                stripeRefundId: refund.id
            },
        });

        if (transaction.order?.status === 'REFUND_IN_PROGRESS') {
            await tx.order.update({
                where: { id: transaction.order.id },
                data: {
                    status: 'PAID',
                },
            });
        }

        this.eventBus.emit(ORDER_REFUNDED_FAILED_EVENT, {
            orderId: transaction.order.id,
            buyerId: transaction.order.buyerId,
            sellerId: transaction.order.sellerId,
            productId: transaction.order.productId,
            refundId: refund.id,
        });
    }

    private async onSubscriptionDelete(
        subscription: Stripe.Subscription,
        tx: Prisma.TransactionClient,
    ) {

        const canceledAt = subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : new Date();

        const sub = await tx.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: {
                status: 'CANCELED',
                currentPeriodEnd: canceledAt,
                canceledAtPeriodEnd: false,
            },
        })

        this.eventBus.emit('SUBSCRIPTION_DELETED_EVENT', {
            userId: sub.userId,
            subscriptionId: subscription.id,
            canceledAt: canceledAt,
        })

    }

    private getStripeSubscriptionIdFromInvoice(
        invoice: Stripe.Invoice,
    ): string | null {
        const parent = invoice.parent;

        if (
            parent &&
            parent.type === 'subscription_details' &&
            parent.subscription_details
        ) {
            const subscription =
                parent.subscription_details.subscription;

            return typeof subscription === 'string'
                ? subscription
                : subscription.id;
        }

        return null;
    }

    private async onPaymentFailed(
        paymentIntent: Stripe.PaymentIntent,
        tx: Prisma.TransactionClient,
    ) {
        await tx.transaction.updateMany({
            where: {
                stripePaymentIntentId: paymentIntent.id,
            },
            data: {
                status: 'FAILED',
            },
        });
    }

    private async onPaymentCanceled(
        paymentIntent: Stripe.PaymentIntent,
        tx: Prisma.TransactionClient,
    ) {
        await tx.transaction.updateMany({
            where: {
                stripePaymentIntentId: paymentIntent.id,
                status: 'PENDING',
            },
            data: {
                status: 'FAILED',
            },
        });
    }

    private async onRefundCompleted(refund: Stripe.Refund,
        tx: Prisma.TransactionClient,
    ) {
        const paymentIntentId = refund.payment_intent as string;

        const transaction = await tx.transaction.findUnique({
            where: { stripePaymentIntentId: paymentIntentId },
            include: { order: true },
        });

        if (!transaction || transaction.status === 'REFUNDED') return

        await tx.transaction.update({
            where: { id: transaction.id },
            data: { status: 'REFUNDED' },
        });

        const order = await tx.order.update({
            where: { id: transaction.orderId },
            data: { status: 'REFUNDED' },
            select: {
                id: true,
                buyerId: true,
                sellerId: true,
                productId: true
            }
        });

        await tx.product.update({
            where: { id: transaction.order.productId },
            data: { status: 'ACTIVE' }
        });

        await this.refundEmailQueue.sendReceiptRefund(order.id)

        this.eventBus.emit(ORDER_REFUNDED_EVENT, {
            orderId: order.id,
            buyerId: order.buyerId,
            sellerId: order.sellerId,
            productId: order.productId,
            refundId: refund.id,
        });
    }

}
