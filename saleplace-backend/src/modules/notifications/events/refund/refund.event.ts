export const ORDER_REFUNDED_EVENT = 'order.refunded' as const;

export interface OrderRefundedEventPayload {
    orderId: string;
    buyerId: string;
    sellerId: string;
    productId: string;
}