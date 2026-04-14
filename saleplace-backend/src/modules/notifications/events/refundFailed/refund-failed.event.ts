export const ORDER_REFUNDED_FAILED_EVENT = 'order.refunded' as const;

export interface OrderRefundedFailedEventPayload {
    orderId: string;
    buyerId: string;
    sellerId: string;
    productId: string;
}