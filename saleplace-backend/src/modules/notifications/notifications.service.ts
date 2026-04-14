import { Inject, Injectable } from '@nestjs/common';
import { AvatarType, NotificationType, Prisma, User } from '@prisma/generated';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PUB_SUB } from 'src/core/pubsub/pubsub.constants';
import type {
    CreateFollowNotification,
    CreateInvoicePaidNotifications,
    CreateNotificationTxInput,
    CreateOrderRefundedFailedNotifications,
    CreatePostNotifications,
    PaidNotificationInput,
    RefundNotificationInput,
    SubscriptionCanceledNotificationInput,
    SubscriptionDeletedNotificationInput
} from './types/notification.types';
import { NotificationModel } from './models/notification.model';
import { ActorModel } from './models/actor.model';
import { PaginationInput } from './inputs/pagination.input';
import { GqlNotificationType } from './enums/notification-type.enum';
import { NotificationsListResponse } from './models/notificationListResponse.model';

@Injectable()
export class NotificationsService {
    public constructor(
        private readonly prismaService: PrismaService,
        @Inject(PUB_SUB)
        private readonly pubSub: PubSub
    ) { }

    async findByUser(
        user: User,
        pagination: PaginationInput = {},
    ): Promise<NotificationsListResponse> {

        const { take = 5, skip = 0 } = pagination

        const [notifications, total] = await this.prismaService.$transaction([
            this.prismaService.notification.findMany({
                where: { userId: user.id },
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    actor: {
                        select: {
                            username: true,
                            avatar: true,
                            avatarType: true,
                        },
                    },
                },
            }),

            this.prismaService.notification.count({
                where: { userId: user.id },
            }),
        ])

        const items = notifications.map(n => {
            const actor = n.actor
                ? Object.assign(new ActorModel(), {
                    username: n.actor.username,
                    avatar: n.actor.avatar,
                    avatarType: n.actor.avatarType,
                })
                : null

            return Object.assign(new NotificationModel(), {
                id: n.id,
                type: n.type as GqlNotificationType,
                isRead: n.isRead,
                createdAt: n.createdAt,
                entityId: n.entityId,
                actor,
            })
        })

        return {
            items,
            total,
        }
    }

    async createFollowNotification(
        payload: CreateFollowNotification
    ): Promise<void> {

        const { actorId, userId } = payload

        const [notification] = await this.prismaService.$transaction(tx =>
            Promise.all([
                this.createNotificationTx(tx, {
                    userId,
                    actorId,
                    type: NotificationType.FOLLOWED,
                }),
            ]),
        )

        await this.publishNotifications([notification])
    }

    async createPostNotifications(
        payload: CreatePostNotifications
    ): Promise<void> {

        const { actorId, postId, userIds } = payload

        if (userIds.length === 0) return;

        const notifications = await this.prismaService.$transaction(async tx => {
            await tx.notification.createMany({
                data: userIds.map(userId => ({
                    userId,
                    actorId,
                    type: NotificationType.POST_CREATED,
                    entityId: postId,
                    isRead: false,
                })),
            });

            await tx.notificationCounter.updateMany({
                where: { userId: { in: userIds } },
                data: { unreadCount: { increment: 1 } },
            });

            return tx.notification.findMany({
                where: {
                    userId: { in: userIds },
                    actorId,
                    type: NotificationType.POST_CREATED,
                    entityId: postId,
                },
                orderBy: { createdAt: 'desc' },
            });
        });

        await this.publishNotifications(notifications);
    }

    async createInvoicePaidNotification(
        payload: CreateInvoicePaidNotifications): Promise<void> {
        const { userId, invoiceId } = payload
        const notification = await this.prismaService.$transaction(tx =>
            this.createNotificationTx(tx, {
                userId: userId,
                actorId: null,
                type: NotificationType.INVOICE_PAID,
                entityId: invoiceId,
            })
        );

        await this.publishNotifications([notification]);
    }

    async createSubscriptionCanceledNotification(
        payload: SubscriptionCanceledNotificationInput,
    ): Promise<void> {
        const { canceledAtPeriodEnd, userId, subscriptionId } = payload
        const notificationType = canceledAtPeriodEnd
            ? NotificationType.SUBSCRIPTION_CANCEL_SCHEDULED
            : NotificationType.SUBSCRIPTION_CANCELED;

        const notification = await this.prismaService.$transaction(tx =>
            this.createNotificationTx(tx, {
                userId: userId,
                actorId: null,
                type: notificationType,
                entityId: subscriptionId,
            }),
        );

        await this.publishNotifications([notification]);
    }

    async createSubscriptionDeletedNotification(
        payload: SubscriptionDeletedNotificationInput): Promise<void> {

        const { userId, subscriptionId } = payload

        const notification = await this.prismaService.$transaction(tx =>
            this.createNotificationTx(tx, {
                userId: userId,
                actorId: null,
                type: NotificationType.SUBSCRIPTION_DELETED,
                entityId: subscriptionId,
            })
        );

        await this.publishNotifications([notification]);
    }

    async createOrderPaidNotifications(
        payload: PaidNotificationInput): Promise<void> {

        const { buyerId, sellerId, orderId, productId } = payload;

        const notifications = await this.prismaService.$transaction(tx =>
            Promise.all([
                this.createNotificationTx(tx, {
                    userId: buyerId,
                    actorId: sellerId,
                    type: NotificationType.ORDER_PAID,
                    entityId: orderId,
                }),
                this.createNotificationTx(tx, {
                    userId: sellerId,
                    actorId: buyerId,
                    type: NotificationType.PRODUCT_SOLD,
                    entityId: productId,
                }),
            ]),
        )

        await this.publishNotifications(notifications)
    }

    async createOrderRefundedNotifications(
        payload: RefundNotificationInput): Promise<void> {
        const { buyerId, sellerId, orderId, productId } = payload;

        const notifications = await this.prismaService.$transaction(tx =>
            Promise.all([
                this.createNotificationTx(tx, {
                    userId: buyerId,
                    actorId: sellerId,
                    type: NotificationType.ORDER_REFUNDED,
                    entityId: orderId,
                }),
                this.createNotificationTx(tx, {
                    userId: sellerId,
                    actorId: buyerId,
                    type: NotificationType.ORDER_REFUNDED_SELLER,
                    entityId: productId,
                }),
            ]),
        )

        await this.publishNotifications(notifications)
    }
    async createOrderRefundedFailedNotifications(
        payload: CreateOrderRefundedFailedNotifications): Promise<void> {
        const { buyerId, sellerId, orderId, productId } = payload;

        const notifications = await this.prismaService.$transaction(tx =>
            Promise.all([
                this.createNotificationTx(tx, {
                    userId: buyerId,
                    actorId: sellerId,
                    type: NotificationType.ORDER_REFUNDED_FAILED,
                    entityId: orderId,
                }),
                this.createNotificationTx(tx, {
                    userId: sellerId,
                    actorId: buyerId,
                    type: NotificationType.ORDER_REFUNDED_FAILED,
                    entityId: productId,
                }),
            ]),
        )

        await this.publishNotifications(notifications)
    }

    async createNotificationTx(
        tx: Prisma.TransactionClient,
        input: CreateNotificationTxInput,
    ) {
        const notification = await tx.notification.create({
            data: {
                userId: input.userId,
                actorId: input.actorId,
                type: input.type,
                entityId: input.entityId,
                isRead: false,
            },
        })

        await tx.notificationCounter.upsert({
            where: { userId: input.userId },
            update: { unreadCount: { increment: 1 } },
            create: { userId: input.userId, unreadCount: 1 },
        })

        return notification
    }



    async markAllAsRead(userId: string): Promise<boolean> {
        await this.prismaService.$transaction([
            this.prismaService.notification.updateMany({
                where: { userId, isRead: false },
                data: { isRead: true },
            }),
            this.prismaService.notificationCounter.upsert({
                where: { userId },
                update: { unreadCount: 0 },
                create: { userId, unreadCount: 0 },
            }),
        ]);

        return true;
    }

    async findUnreadNotificationCount(userId: string): Promise<number> {
        const counter = await this.prismaService.notificationCounter.findUnique({
            where: { userId },
            select: { unreadCount: true },
        })

        return counter?.unreadCount ?? 0
    }


    async deleteNotification(
        userId: string,
        notificationId: string,
    ): Promise<boolean> {

        return this.prismaService.$transaction(async (tx) => {
            const notification = await tx.notification.findUnique({
                where: { id: notificationId },
                select: { userId: true, isRead: true },
            });

            if (!notification) {
                return true
            }

            if (notification.userId !== userId) {
                throw new Error('FORBIDDEN');
            }

            await tx.notification.delete({
                where: { id: notificationId }
            })

            if (!notification.isRead) {
                await tx.notificationCounter.update({
                    where: { userId },
                    data: { unreadCount: { decrement: 1 } },
                })
            }

            return true
        })
    }

    private async publishNotifications(
        notifications: {
            id: string
            actorId: string | null
            userId: string
            type: NotificationType
            isRead: boolean
            createdAt: Date
            entityId?: string | null
        }[],
    ) {

        for (const notification of notifications) {
            let actor = null;

            if (notification.actorId) {
                const user = await this.prismaService.user.findUnique({
                    where: { id: notification.actorId },
                    select: { id: true, username: true, avatar: true },
                });
                actor = user ?? null;
            }

            this.publishNotification(notification, actor);
        }

    }

    private publishNotification(
        notification: {
            id: string;
            type: NotificationType;
            isRead: boolean;
            createdAt: Date;
            userId: string;
            entityId?: string | null;
        },
        actor: {
            id: string;
            username: string;
            avatar: string | null;
        } | null,
    ) {


        this.pubSub.publish('notification.created', {
            notificationCreated: {
                id: notification.id,
                type: notification.type,
                isRead: notification.isRead,
                createdAt: notification.createdAt,
                userId: notification.userId,
                entityId: notification.entityId ?? null,
                actor
            },
        });
    }

}
