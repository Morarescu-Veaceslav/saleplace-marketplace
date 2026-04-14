import { NotificationType } from "@prisma/generated"

export type CreateNotificationTxInput = {
    userId: string
    actorId: string | null
    type: NotificationType
    entityId?: string
}

export type PaidNotificationInput = {
    buyerId: string;
    sellerId: string;
    orderId: string;
    productId: string;
}

export interface RefundNotificationInput {
    buyerId: string;
    sellerId: string;
    orderId: string;
    productId: string;
}


export interface SubscriptionCanceledNotificationInput {
    userId: string;
    subscriptionId: string;
    canceledAtPeriodEnd: boolean;
}

export interface SubscriptionDeletedNotificationInput {
    userId: string;
    subscriptionId: string;
    canceledAt: Date;
}

export interface CreateOrderRefundedFailedNotifications {
    buyerId: string;
    sellerId: string;
    orderId: string;
    productId: string;

}

export interface CreateInvoicePaidNotifications {
    userId: string;
    invoiceId: string;
    subscriptionId?: string | null;
}

export interface CreatePostNotifications {
    actorId: string,
    postId: string,
    userIds: string[],
}

export interface CreateFollowNotification {
    actorId: string,
    userId: string,
}

// export enum NotificationType {
//   POST_CREATED = 'POST_CREATED',
//   COMMENT_CREATED = 'COMMENT_CREATED',
//   ORDER_PAID = 'ORDER_PAID',
//   PRODUCT_SOLD = 'PRODUCT_SOLD',
//   FOLLOWED = 'FOLLOWED',
//   ORDER_REFUNDED = 'ORDER_REFUNDED',
//   ORDER_REFUNDED_FAILED = 'ORDER_REFUNDED_FAILED',
//   ORDER_REFUNDED_SELLER = 'ORDER_REFUNDED_SELLER',
//   INVOICE_PAID = 'INVOICE_PAID',
//   SUBSCRIPTION_CANCEL_SCHEDULED = 'SUBSCRIPTION_CANCEL_SCHEDULED',
//   SUBSCRIPTION_CANCELED = 'SUBSCRIPTION_CANCELED',
//   SUBSCRIPTION_DELETED = 'SUBSCRIPTION_DELETED',
//   LIKED = 'LIKED',
// }

