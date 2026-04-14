import { Injectable } from '@nestjs/common';
import { StripeService } from '../libs/stripe/stripe.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { CheckoutResponse } from './model/checkout.model';
import { RefundResponse } from './model/refund.model';

@Injectable()
export class CheckoutService {
    constructor(
        private readonly stripeService: StripeService,
        private readonly prismaService: PrismaService,
    ) { }


    async createOrder(productId: string, buyerId: string): Promise<CheckoutResponse> {

        const product = await this.prismaService.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            throw new GraphQLError('Product not found', {
                extensions: { code: 'PRODUCT_NOT_FOUND' },
            });
        }

        if (product.status !== 'ACTIVE') {
            throw new GraphQLError('Product is no longer available', {
                extensions: { code: 'PRODUCT_NOT_AVAILABLE' },
            });
        }

        await this.prismaService.$transaction(async (tx) => {
            const expiredOrder = await tx.order.findFirst({
                where: {
                    productId,
                    status: 'PENDING',
                    expiresAt: { lt: new Date() },
                },
            });

            if (!expiredOrder) return;

            await tx.order.update({
                where: { id: expiredOrder.id },
                data: { status: 'CANCELED' },
            });

            await tx.transaction.update({
                where: { orderId: expiredOrder.id },
                data: { status: 'CANCELED' },
            });
        });

        const activeOrder = await this.prismaService.order.findFirst({
            where: {
                productId,
                status: 'PENDING',
                expiresAt: { gt: new Date() },
            },
        });

        if (activeOrder) {
            throw new GraphQLError('Product already reserved', {
                extensions: { code: 'PRODUCT_ALREADY_RESERVED' },
            });
        }

        const order = await this.prismaService.order.create({
            data: {
                productId,
                buyerId,
                sellerId: product.userId,
                price: product.price,
                currency: 'eur',
                status: 'PENDING',
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        const session = await this.stripeService.client.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.title,
                            description: product.description,
                        },
                        unit_amount: Math.round(product.price.toNumber() * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:3000/payment/success`,
            cancel_url: `http://localhost:3000/payment/cancel`,
            metadata: {
                orderId: order.id,
                type: 'PAYMENT',
            },
        });

        await this.prismaService.transaction.create({
            data: {
                orderId: order.id,

                amount: product.price,
                currency: 'eur',
                status: 'PENDING',
            },
        });

        return { checkoutUrl: session.url! }
    }


    async refundOrder(orderId: string, userId: string): Promise<RefundResponse> {

        const order = await this.prismaService.order.findUnique({
            where: { id: orderId },
            include: { transaction: true },
        });

        if (!order) {
            throw new GraphQLError('Order not found', {
                extensions: { code: 'ORDER_NOT_FOUND' },
            });
        }

        if (order.buyerId !== userId) {
            throw new GraphQLError('You are not authorized to refund this order', {
                extensions: { code: 'FORBIDDEN' },
            });
        }

        const transaction = order.transaction;
        if (!transaction) {
            throw new GraphQLError('Transaction not found for this order', {
                extensions: { code: 'TRANSACTION_NOT_FOUND' },
            });
        }

        if (transaction.status === 'REFUNDED') {
            throw new GraphQLError('This transaction has already been refunded', {
                extensions: { code: 'ALREADY_REFUNDED' },
            });
        }

        if (transaction.status === 'REFUND_REQUESTED') {
            throw new GraphQLError('Refund is already in progress', {
                extensions: { code: 'REFUND_IN_PROGRESS' },
            });
        }

        if (!transaction.stripePaymentIntentId) {
            throw new GraphQLError('Payment not completed', {
                extensions: { code: 'PAYMENT_NOT_COMPLETED' },
            });
        }

        const refund = await this.stripeService.client.refunds.create({
            payment_intent: transaction.stripePaymentIntentId,
        });

        await this.prismaService.$transaction([
            this.prismaService.transaction.update({
                where: { id: transaction.id },
                data: {
                    status: 'REFUND_REQUESTED',
                    stripeRefundId: refund.id,
                },
            }),
            this.prismaService.order.update({
                where: { id: order.id },
                data: {
                    status: 'REFUND_PENDING',
                },
            }),
        ]);

        return {
            refundId: refund.id,
            status: 'REFUND_REQUESTED',
        };

    }
}
