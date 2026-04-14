import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { StripeService } from '../libs/stripe/stripe.service';
import { User } from '@prisma/generated';
import { SubscriptionResponse } from './models/subscription.model';
import { GraphQLError } from 'graphql';
import { GetSubscriptionResponse } from './models/subscription-get.model';
import { CanceledSubscription } from './models/subscription-canceled';
import { SubscriptionPlanResponse } from './models/subscription-plan';
import { SubscriptionWarning } from './models/SubscriptionWarning';

@Injectable()
export class SubscriptionService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly stripeService: StripeService
    ) { }
    public async makePayment(user: User, planId: string): Promise<SubscriptionResponse> {
        const plan = await this.prismaService.subscriptionPlan.findUnique({
            where: { id: planId }
        });


        let stripeCustomerId = user.stripeCustomerId;

        if (!stripeCustomerId) {
            const customer = await this.stripeService.client.customers.create({
                email: user.email,
                metadata: {
                    userId: user.id,
                },
            });

            stripeCustomerId = customer.id;

            await this.prismaService.user.update({
                where: { id: user.id },
                data: { stripeCustomerId },
            });
        }

        if (!plan) {
            throw new GraphQLError('Plan not found', {
                extensions: { code: 'PLAN_NOT_FOUND' },
            });
        }

        const currentSubscription = await this.prismaService.subscription.findUnique({
            where: { userId: user.id },
            include: { plan: true },
        });

        let warning: SubscriptionWarning | null = null;

        if (currentSubscription && currentSubscription.status === 'ACTIVE') {
            const planLimit = currentSubscription.plan.productLimit;


            if (planLimit !== null && planLimit !== -1) {
                const remaining =
                    planLimit - currentSubscription.productsUsed;

                if (remaining > 0) {
                    warning = {
                        code: 'SUBSCRIPTION_UNUSED_PRODUCTS',
                        params: {
                            remaining,
                        },
                    }
                }
            }
        }

        const session = await this.stripeService.client.checkout.sessions.create({
            mode: 'subscription',
            customer: stripeCustomerId,
            line_items: [
                {
                    price: plan.stripePriceId,
                    quantity: 1,
                },
            ],

            success_url: `http://localhost:3000/payment/success`,
            cancel_url: `http://localhost:3000/payment/cancel`,
            metadata: {
                userId: user.id,
                planId: plan.id,
                type: 'SUBSCRIPTION',
            },
        });

        return { url: session.url!, warning };
    }


    async cancelSubscription(userId: string): Promise<CanceledSubscription> {

        const subscription = await this.prismaService.subscription.findUnique({
            where: { userId },
        });

        if (!subscription || !subscription.stripeSubscriptionId) {
            throw new GraphQLError('Subscription not found', {
                extensions: { code: 'SUBSCRIPTION_NOT_FOUND' },
            });
        }

        await this.stripeService.client.subscriptions.update(
            subscription.stripeSubscriptionId,
            {
                cancel_at_period_end: true,
            },
        );

        const canceledSubscription = await this.prismaService.subscription.update({
            where: { userId },
            data: {
                status: 'CANCELED_PENDING'
            },
            select: {
                id: true,
                status: true
            }
        });

        return canceledSubscription
    }

    async getSubscription(userId: string): Promise<GetSubscriptionResponse[]> {

        const subscriptions = await this.prismaService.subscription.findMany({
            where: {
                userId
            },
            include: {
                plan: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return subscriptions.map(sub => ({
            id: sub.id,
            status: sub.status,
            interval: sub.interval,
            productUser: sub.productsUsed,
            plan: {
                id: sub.plan.id,
                name: sub.plan.name,
                price: sub.plan.price.toNumber(),
                limit: sub.plan.productLimit,
            },
            canceledAtPeriodEnd: sub.canceledAtPeriodEnd,
            currentPeriodStart: sub.currentPeriodStart,
            currentPeriodEnd: sub.currentPeriodEnd,
        }));
    }

    async subscriptionPlans(): Promise<SubscriptionPlanResponse[]> {
        const plans = await this.prismaService.subscriptionPlan.findMany({
            select: {
                id: true,
                name: true,
                productLimit: true,
                price: true,
            },
            orderBy: {
                price: 'asc',
            },
        });

        return plans.map(plan => ({
            id: plan.id,
            name: plan.name,
            productLimit: plan.productLimit ?? null,
            price: Number(plan.price),
        }))
    }

}
