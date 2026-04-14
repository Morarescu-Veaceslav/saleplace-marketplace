export interface SendRefundEmail {
  to: string;
  orderId: string;
  productName: string;
  price: string;
  currency: string;
  refundId: string;
}