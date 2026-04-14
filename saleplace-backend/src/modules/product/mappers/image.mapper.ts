import { ProductImageModel } from "../models/product-images.model";

export function normalizeImage(img: any): ProductImageModel {
  return {
    ...img,
    position: img.position ?? 0,
    url: img.url ?? '',
  };
}