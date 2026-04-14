export const SUBSCRIPTION_CANCELED_EVENT = 'subscription.canceled' as const;

export interface SubscriptionCanceledEventPayload {
    userId: string;
    subscriptionId: string;
    canceledAtPeriodEnd: boolean;
    currentPeriodEnd?: Date | null;
}
