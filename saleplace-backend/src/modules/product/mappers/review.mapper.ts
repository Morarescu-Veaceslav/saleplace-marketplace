import { ReviewModel } from "../models/review.model";
import { normalizeUser } from "./user.mapper";

export function normalizeReview(review: any): ReviewModel {
  return {
    id: review.id,
    rating: review.rating ?? 0,
    comment: review.comment ?? '',
    createdAt: review.createdAt,
    user: normalizeUser(review.user),
  };
}