export const PRODUCT_VIEW_EVENT = 'product.view' as const;

export interface ProductViewEventPayload {
  productId: string;
}