export const PRODUCT_IMAGES_DELETED_EVENT = 'product.image.deleted' as const;

export interface ProductImageDeletedEvent {
    productId: string;
    urls: string[];
}