export interface SendCheckoutEmail {
  to: string;
  orderId: string;
  productName: string;
  price: string;
  currency: string;
  transactionId: string;
}

export interface CheckoutTemplateProps {
  orderId: string;
  productName: string;
  price: string;
  currency: string;
  transactionId: string;
}