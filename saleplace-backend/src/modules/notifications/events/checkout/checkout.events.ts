export const ORDER_PAID_EVENT = 'notification.created' as const;

export interface OrderPaidEventPayload {
  orderId: string;
  buyerId: string;
  sellerId: string;
  productId: string;
}