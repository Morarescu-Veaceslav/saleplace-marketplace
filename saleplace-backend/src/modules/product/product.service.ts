import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateProductInput } from './inputs/create-product.input';
import { GraphQLError } from 'graphql';
import { Prisma, ProductStatus, User } from '@prisma/generated';
import { v4 as uuidv4 } from 'uuid'
import { StorageService } from '../libs/storage/storage.service';
import { UpdateProductInput } from './inputs/update-product.input';
import { DeleteProductInput } from './inputs/delete-product.input';
import { ProductsFilterInput } from './inputs/filtre-product.input';
import { RedisService } from 'src/core/redis/redis.service';
import { EventbusService } from 'src/core/eventbus/eventbus.service';
import { PRODUCT_VIEW_EVENT } from './events/product-view.event';
import { ProductModel } from './models/product.model';
import { Decimal } from '@prisma/generated/runtime/library';
import { normalizeImage } from './mappers/image.mapper';
import { normalizeCategory } from './mappers/category.mapper';
import { normalizeUser } from './mappers/user.mapper';
import { normalizeReview } from './mappers/review.mapper';
import { mapProductToListItem } from './mappers/product.mapper';
import { CreateProductModel } from './models/create-product.model';

@Injectable()
export class ProductService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
        private readonly redisService: RedisService,
        private readonly eventBus: EventbusService
    ) { }

    public async create(input: CreateProductInput, user: User): Promise<CreateProductModel> {

        if (!user.isEmailVerified) {
            throw new GraphQLError('Email not verified', {
                extensions: { code: 'EMAIL_NOT_VERIFIED' },
            })
        }

        const { title, description, price, categoryId } = input

        if (!title.trim()) {
            throw new GraphQLError('Title is required', {
                extensions: { code: 'INVALID_INPUT' },
            })
        }

        if (price <= 0) {
            throw new GraphQLError('Invalid price', {
                extensions: { code: 'INVALID_PRICE' },
            })
        }

        const category = await this.prismaService.category.findUnique({
            where: { id: categoryId },
            select: {
                id: true,
                isActive: true,
                children: { select: { id: true }, take: 1 },
            },
        })

        if (!category) {
            throw new GraphQLError('Category not found', {
                extensions: { code: 'CATEGORY_NOT_FOUND' },
            })
        }

        if (!category.isActive) {
            throw new GraphQLError('Category inactive', {
                extensions: { code: 'CATEGORY_INACTIVE' },
            })
        }

        if (category.children.length > 0) {
            throw new GraphQLError('Product can be added only to leaf categories', {
                extensions: { code: 'CATEGORY_NOT_LEAF' },
            })
        }

        const product = await this.prismaService.$transaction(async tx => {
            const product = await tx.product.create({
                data: {
                    title,
                    description,
                    price,
                    slug: generateSlug(title),
                    userId: user.id,
                    status: ProductStatus.DRAFT,
                    categoryId,
                },
                select: {
                    id: true
                }
            })


            const subscription = await tx.subscription.findUnique({
                where: { userId: user.id }
            })

            if (subscription) {
                await tx.subscription.update({
                    where: { id: subscription.id },
                    data: {
                        productsUsed: { increment: 1 },
                    },
                });
            }

            return product;
        })

        return product
    }



    public async update(
        input: UpdateProductInput,
        user: User
    ): Promise<Boolean> {

        const { productId, title, description, price, categoryId, status } = input;

        const product = await this.prismaService.product.findFirst({
            where: { id: productId, userId: user.id },
            include: { category: true, images: true },
        });

        if (!product) {
            throw new GraphQLError('Product not found', {
                extensions: { code: 'PRODUCT_NOT_FOUND' },
            });
        }

        const ALLOWED_STATUSES = new Set<ProductStatus>([
            ProductStatus.DRAFT,
            ProductStatus.ACTIVE,
            ProductStatus.ARCHIVED,
        ]);

        if (status !== undefined && !ALLOWED_STATUSES.has(status)) {
            throw new GraphQLError('Invalid product status on update', {
                extensions: { code: 'INVALID_PRODUCT_STATUS' },
            });
        }

        const updateData: Prisma.ProductUpdateInput = {};

        if (categoryId !== undefined && categoryId !== product.category?.id) {
            const category = await this.prismaService.category.findUnique({
                where: { id: categoryId },
                include: { children: true },
            });

            if (!category) {
                throw new GraphQLError('Category not found', {
                    extensions: { code: 'CATEGORY_NOT_FOUND' },
                });
            }

            if (category.children.length > 0) {
                throw new GraphQLError(
                    'Product can be added only to leaf categories',
                    { extensions: { code: 'CATEGORY_NOT_LEAF' } }
                );
            }

            updateData.category = {
                connect: { id: categoryId }
            }
        }

        if (title !== undefined) updateData.title = generateSlug(title);
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) {
            if (price < 0) {
                throw new GraphQLError('Price must be positive', {
                    extensions: { code: 'INVALID_PRICE' },
                });
            }
            updateData.price = price;
        }
        if (status !== undefined) updateData.status = status;


        if (Object.keys(updateData).length === 0) return true;

        await this.prismaService.product.update({
            where: { id: productId },

            data: updateData,
        })

        return true;
    }

    public async publishProduct(
        productId: string,
        user: User
    ): Promise<boolean> {

        const product = await this.prismaService.product.findFirst({
            where: {
                id: productId,
                userId: user.id,
            },
            include: {
                images: true,
                category: { include: { children: true } },
            },
        });

        if (!product) {
            throw new GraphQLError('Product not found', {
                extensions: { code: 'PRODUCT_NOT_FOUND' },
            });
        }

        if (product.publishedAt) {
            throw new GraphQLError('Product already published', {
                extensions: { code: 'PRODUCT_PUBLISHED' },
            });
        }

        if (product.status !== ProductStatus.DRAFT) {
            throw new GraphQLError('Only draft products can be published', {
                extensions: { code: 'ONLY_DRAFT_PRODUCT' },
            });
        }

        if (product.images.length === 0) {
            throw new GraphQLError('Add at least one image', {
                extensions: { code: 'IMAGE_ERROR' },
            });
        }

        if (product.category.children.length > 0) {
            throw new GraphQLError('Category must be leaf', {
                extensions: { code: 'CATEGORY_ERROR' },
            });
        }

        await this.prismaService.product.update({
            where: { id: product.id },
            data: {
                status: ProductStatus.ACTIVE,
                publishedAt: new Date(),
            },
        });

        this.eventBus.emit('post.published', {
            postId: product.id,
            authorId: product.userId,
        });

        return true;
    }


    public async deleteProduct(
        input: DeleteProductInput,
        user: User,
    ): Promise<Boolean> {
        const { productId } = input

        const product = await this.prismaService.product.findUnique({
            where: {
                id: productId,
                userId: user.id
            },
            include: {
                images: true,
            },
        })

        if (!product) {
            throw new GraphQLError('Product not found or not your product', {
                extensions: { code: 'NOT_YOUR_PRODUCT' },
            });
        }

        // await Promise.all(
        //     product.images.map(image =>
        //         this.storageService.deleteImage(image.url),
        //     ),
        // );

        // await this.prismaService.$transaction([
        //     this.prismaService.productImage.deleteMany({
        //         where: { productId },
        //     }),
        //     this.prismaService.product.delete({
        //         where: { id: productId },
        //     }),
        // ]);

        await this.prismaService.product.update({
            where: { id: productId },
            data: {
                status: 'DELETED',
                deletedAt: new Date(),
            },
        });
        return true
    }

    async getOne(id: string): Promise<ProductModel> {
        const product = await this.prismaService.product.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                price: true,
                views: true,
                status: true,
                averageRating: true,
                reviewsCount: true,
                createdAt: true,
                images: { orderBy: { position: 'asc' } },
                category: { select: { id: true, name: true, slug: true, description: true, icon: true, isActive: true, parentId: true, children: true } },
                user: { select: { id: true, username: true, displayName: true, avatar: true, avatarType: true, bio: true, createdAt: true } },
                reviews: {
                    where: { isDeleted: false },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        createdAt: true,
                        user: { select: { id: true, username: true, displayName: true, avatar: true, avatarType: true, bio: true, createdAt: true } }
                    }
                },
            },
        });

        if (!product) {
            throw new GraphQLError('Product not found', { extensions: { code: 'PRODUCT_NOT_FOUND' } });
        }

        return {
            ...product,
            price: (product.price as Decimal).toNumber(),
            images: product.images?.map(normalizeImage) ?? [],
            category: normalizeCategory(product.category),
            user: normalizeUser(product.user),
            reviews: product.reviews?.map(normalizeReview) ?? [],
        }
    }


    async getByUser(
        userId: string,
        page = 1,
        limit = 10,
        status: ProductStatus = ProductStatus.ACTIVE
    ) {

        page = Math.max(1, page)
        limit = Math.min(Math.max(1, limit), 50)

        const skip = (page - 1) * limit

        const where = { userId, status }

        const [items, total] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                include: {
                    images: { take: 1, orderBy: { position: 'asc' } },
                    category: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prismaService.product.count({ where }),
        ]);

        return {
            items: items.map(mapProductToListItem),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
    }

    async getAll(filter: ProductsFilterInput) {

        let { page = 1, limit = 10, categoryId, minPrice, maxPrice, sortBy, search } = filter

        page = Math.max(1, page)
        limit = Math.min(Math.max(1, limit), 50)

        const where: Prisma.ProductWhereInput = { status: ProductStatus.ACTIVE }

        if (categoryId) where.categoryId = categoryId
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {}
            if (minPrice !== undefined) where.price.gte = minPrice
            if (maxPrice !== undefined) where.price.lte = maxPrice
        }

        if (search && search.trim().length >= 2) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { category: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }

        const orderBy: Prisma.ProductOrderByWithRelationInput = {}
        switch (sortBy) {
            case 'views': orderBy.views = 'desc'; break;
            case 'price': orderBy.price = 'asc'; break;
            default: orderBy.createdAt = 'desc';
        }

        const skip = (page - 1) * limit

        const [items, total] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    images: { take: 1, orderBy: { position: 'asc' } },
                    category: { select: { id: true, name: true } },
                    user: { select: { id: true, username: true, displayName: true, avatar: true } },
                },
            }),
            this.prismaService.product.count({ where }),
        ]);

        return {
            items: items.map(mapProductToListItem),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
    }

    async trackProductView(productId: string, userId: string) {

        const redisKey = `product:${productId}:user:${userId}`;

        const alreadyViewed = await this.redisService.client.get(redisKey);

        if (alreadyViewed) return true;

        await this.redisService.client.set(redisKey, '1', 'EX', 300);

        this.eventBus.emit(PRODUCT_VIEW_EVENT, { productId, userId });

        return true;
    }

}

function generateSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
}
