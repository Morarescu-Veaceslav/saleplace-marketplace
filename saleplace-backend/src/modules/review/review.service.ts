import { Injectable } from '@nestjs/common';
import { EventbusService } from 'src/core/eventbus/eventbus.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateReviewInput } from './inputs/create-review.input';
import { User } from '@prisma/generated';
import { GraphQLError } from 'graphql';
import { UpdateReviewInput } from './inputs/update-review.input';
import { DeleteReviewInput } from './inputs/delete-review.input';
import { RestoreReviewInput } from './inputs/restore-review.input';
import { MyReviewModel } from './models/review.model';
import { ReviewModel } from '../product/models/review.model';

@Injectable()
export class ReviewService {
    public constructor(
        private readonly prismaService: PrismaService) { }

    async createReview(user: User, input: CreateReviewInput): Promise<ReviewModel> {
        const { rating, comment, productId } = input;

        if (rating == null && !comment?.trim()) {
            throw new GraphQLError(
                'You must provide at least a rating or a comment',
                { extensions: { code: 'REVIEW_ERROR' } }
            );
        }

        if (rating != null && (rating < 1 || rating > 5)) {
            throw new GraphQLError(
                'Rating must be between 1 and 5',
                { extensions: { code: 'RATING_ERROR' } }
            );
        }

        const newReview = await this.prismaService.$transaction(async (tx) => {

            const product = await tx.product.findUnique({
                where: { id: productId },
                select: {
                    id: true,
                    averageRating: true,
                    reviewsCount: true,
                },
            });

            // const hasPurchased = await tx.transaction.findFirst({
            //     where: {
            //         userId: user.id,
            //         productId,
            //         status: 'SUCCESS',
            //     },
            // });

            // if (!hasPurchased) {
            //     throw new GraphQLError(
            //         'You can review only purchased products',
            //         { extensions: { code: 'NOT_PURCHASED' } }
            //     );
            // }

            if (!product) {
                throw new GraphQLError('Product not found', {
                    extensions: { code: 'PRODUCT_NOT_FOUND' },
                });
            }

            const existingReview = await tx.review.findFirst({
                where: {
                    userId: user.id,
                    productId,
                },
                select: {
                    id: true,
                    isDeleted: true,
                },
            });

            if (existingReview) {
                throw new GraphQLError(
                    'You already reviewed this product. You can edit your review.',
                    { extensions: { code: 'REVIEW_ALREADY_EXISTS' } }
                );
            }

            const newReview = await tx.review.create({
                data: {
                    rating: rating ?? null,
                    comment: comment?.trim() ?? '',
                    productId,
                    userId: user.id,

                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                            avatarType: true,
                            bio: true,
                            createdAt: true
                        },
                    },
                },
            });

            if (rating != null) {
                const currentCount = product.reviewsCount ?? 0;
                const currentAverage = product.averageRating ?? 0;

                const newCount = currentCount + 1;
                const newAverage =
                    (currentAverage * currentCount + rating) / newCount;

                await tx.product.update({
                    where: { id: productId },
                    data: {
                        reviewsCount: newCount,
                        averageRating: newAverage,
                    },
                });
            }

            return newReview
        });

        return newReview;
    }



    async updateReview(user: User, input: UpdateReviewInput): Promise<ReviewModel> {
        const { reviewId, rating, comment } = input;

        if (rating == null && comment == null) {
            throw new GraphQLError('You must update at least rating or comment', {
                extensions: { code: 'REVIEW_UPDATE_ERROR' },
            });
        }

        return this.prismaService.$transaction(async (tx) => {

            const review = await tx.review.findUnique({
                where: { id: reviewId },
            })

            if (!review) {
                throw new GraphQLError('Review not found', {
                    extensions: { code: 'REVIEW_NOT_FOUND' },
                })
            }

            if (review.userId !== user.id) {
                throw new GraphQLError('Forbidden', {
                    extensions: { code: 'FORBIDDEN' },
                })
            }

            const updatedReview = await tx.review.update({
                where: { id: reviewId },
                data: {
                    rating,
                    comment: comment ?? review.comment,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                            avatarType: true,
                            bio: true,
                            createdAt: true,
                        },
                    },
                },
            })

            return updatedReview
        })
    }


    async deleteReview(user: User, input: DeleteReviewInput,): Promise<boolean> {
        return this.prismaService.$transaction(async (tx) => {

            const { reviewId } = input;

            const review = await tx.review.findUnique({
                where: { id: reviewId },
                select: {
                    id: true,
                    rating: true,
                    productId: true,
                    userId: true,
                    isDeleted: true,
                },
            });

            if (!review || review.isDeleted) {
                throw new GraphQLError('Review not found', {
                    extensions: { code: 'REVIEW_NOT_FOUND' },
                });
            }

            if (review.userId !== user.id) {
                throw new GraphQLError('Forbidden', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            await tx.review.update({
                where: { id: reviewId },
                data: { isDeleted: true },
            });

            if (review.rating == null) {
                return true;
            }

            const product = await tx.product.findUnique({
                where: { id: review.productId },
                select: {
                    averageRating: true,
                    reviewsCount: true,
                },
            });

            if (!product || product.reviewsCount <= 1) {
                await tx.product.update({
                    where: { id: review.productId },
                    data: {
                        reviewsCount: 0,
                        averageRating: 0,
                    },
                });

                return true;
            }

            const total = product.averageRating * product.reviewsCount;
            const newCount = product.reviewsCount - 1;
            const newAverage = (total - review.rating) / newCount;

            await tx.product.update({
                where: { id: review.productId },
                data: {
                    reviewsCount: newCount,
                    averageRating: newAverage,
                },
            });

            return true;
        });
    }

    async myReviews(user: User): Promise<MyReviewModel[]> {
        return await this.prismaService.review.findMany({
            where: {
                userId: user.id,
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                isDeleted: true,
                createdAt: true,
                product: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async restoreReview(user: User, input: RestoreReviewInput): Promise<boolean> {
        return this.prismaService.$transaction(async (tx) => {

            const { reviewId } = input

            const review = await tx.review.findUnique({
                where: { id: reviewId },
            });

            if (!review) {
                throw new GraphQLError('Review not found', {
                    extensions: { code: 'REVIEW_NOT_FOUND' },
                });
            }

            if (review.userId !== user.id) {
                throw new GraphQLError('You can only restore your own review', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            if (!review.isDeleted) {
                throw new GraphQLError('Review is already active', {
                    extensions: { code: 'REVIEW_ALREADY_ACTIVE' },
                });
            }

            await tx.review.update({
                where: { id: reviewId },
                data: {
                    isDeleted: false,
                },
            });

            if (review.rating == null) return true;

            const product = await tx.product.findUnique({
                where: { id: review.productId },
                select: {
                    averageRating: true,
                    reviewsCount: true,
                },
            });

            if (!product) return true;

            const newCount = product.reviewsCount + 1;
            const total = (product.averageRating ?? 0) * product.reviewsCount;
            const newAverage = (total + review.rating) / newCount;

            await tx.product.update({
                where: { id: review.productId },
                data: {
                    reviewsCount: newCount,
                    averageRating: newAverage,
                },
            });

            return true;
        });
    }

}
