export const SUBSCRIPTION_DELETED_EVENT = 'subscription.deleted' as const;

export interface SubscriptionDeletedEventPayload {
    userId: string;
    subscriptionId: string;
    canceledAt: Date;
}
