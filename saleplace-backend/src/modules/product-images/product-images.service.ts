import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { StorageService } from '../libs/storage/storage.service';
import { DeleteProductImagesInput } from './inputs/delete-product-images.input';
import { User } from '@prisma/generated';
import { GraphQLError } from 'graphql';
import { UpdateProductImagesPositionInput } from './inputs/update-product-images.input';
import { UploadProductImagesInput } from './inputs/upload-product-image.input';
import { assertAffected } from 'src/common/helpers/assert-affected';
import { EventbusService } from 'src/core/eventbus/eventbus.service';
import { PRODUCT_IMAGES_DELETED_EVENT } from './events/product-image.event';


@Injectable()
export class ProductImagesService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
        private readonly eventBus: EventbusService,
    ) { }


    // public async uploadImages(
    //     input: UploadProductImagesInput,
    //     user: User,
    // ): Promise<boolean> {
    //     const { productId, files, positions } = input

    //     if (!files || files.length === 0) {
    //         throw new GraphQLError('No images provided', {
    //             extensions: { code: 'INVALID_INPUT' },
    //         });
    //     }

    //     if (files.length > 10) {
    //         throw new GraphQLError('Maximum 10 images allowed', {
    //             extensions: { code: 'IMAGE_LIMIT_EXCEEDED' },
    //         });
    //     }

    //     if (positions && positions.length !== files.length) {
    //         throw new GraphQLError('Positions count does not match files count', {
    //             extensions: { code: 'INVALID_INPUT' },
    //         });
    //     }

    //     const product = await this.prismaService.product.findUnique({
    //         where: { id: productId },
    //         select: { id: true, userId: true },
    //     });

    //     if (!product) {
    //         throw new GraphQLError('Product not found', {
    //             extensions: { code: 'PRODUCT_NOT_FOUND' },
    //         })
    //     }

    //     if (product.userId !== user.id) {
    //         throw new GraphQLError('Not your product', {
    //             extensions: { code: 'NOT_YOUR_PRODUCT' },
    //         })
    //     }

    //     const uploadedFiles: { url: string; position: number }[] = [];

    //     try {
    //         for (let i = 0; i < files.length; i++) {
    //             const file = await files[i];

    //             const url = await this.storageService.uploadFile(
    //                 file,
    //                 'products',
    //                 1024,
    //                 1024,
    //             );

    //             uploadedFiles.push({
    //                 url,
    //                 position: positions?.[i] ?? i,
    //             });
    //         }

    //         await this.prismaService.$transaction(async tx => {
    //             const result = await tx.productImage.createMany({
    //                 data: uploadedFiles.map(f => ({
    //                     productId,
    //                     url: f.url,
    //                     position: f.position,
    //                 })),
    //             });

    //             assertAffected(result.count, 'Images were not saved');
    //         });

    //         return true;
    //     } catch (error) {
    //         for (const file of uploadedFiles) {
    //             await this.storageService.deleteImage(file.url);
    //         }
    //         throw error;
    //     }

    // }

    async saveProductImages(
        productId: string,
        images: { url: string }[],
        userId: string,
    ) {
        const product = await this.prismaService.product.findUnique({
            where: { id: productId },
        })

        if (images.length > 10) {
            throw new GraphQLError('Maximum 10 images allowed', {
                extensions: { code: 'IMAGE_LIMIT_EXCEEDED' },
            });
        }

        if (!product) {
            throw new GraphQLError('Product not found', {
                extensions: { code: 'PRODUCT_NOT_FOUND' },
            })
        }

        if (product.userId !== userId) {
            throw new GraphQLError('Not your product', {
                extensions: { code: 'NOT_YOUR_PRODUCT' },
            })
        }

        await this.prismaService.productImage.createMany({
            data: images.map((img, index) => ({
                url: img.url,
                position: index,
                productId,

            }))
        })

        const productImages = await this.prismaService.productImage.findMany({
            where: { productId },
            orderBy: { position: 'asc' },
        })

        return productImages;
    }

    public async deleteProductImages(
        input: DeleteProductImagesInput,
        user: User,
    ) {
        const { productId, imageIds } = input

        const product = await this.prismaService.product.findFirst({
            where: {
                id: productId,
                userId: user.id,
            },
            select: { id: true },
        });

        if (!product) {
            throw new GraphQLError('Not allowed', {
                extensions: { code: 'NOT_ALLOWED' },
            });
        }

        const images = await this.prismaService.productImage.findMany({
            where: {
                id: { in: imageIds },
                productId,
            },
            select: {
                id: true,
                url: true,
            },
        });

        if (images.length !== imageIds.length) {
            throw new GraphQLError('Some images not found', {
                extensions: { code: 'IMAGES_NOT_FOUND' },
            });
        }

        const urls = images.map(img => img.url);

        this.eventBus.emit(PRODUCT_IMAGES_DELETED_EVENT, {
            productId,
            urls,
        });

        await this.prismaService.productImage.deleteMany({
            where: {
                id: { in: imageIds },
                productId,
            },
        });

        return true
    }

    public async updateImagesPosition(
        input: UpdateProductImagesPositionInput,
        user: User,
    ) {
        const { productId, imageIds } = input

        console.log(productId, imageIds)

        const product = await this.prismaService.product.findFirst({
            where: { id: productId, userId: user.id },
        });

        if (!product) {
            throw new GraphQLError('Not allowed', {
                extensions: { code: 'NOT_ALLOWED' },
            });
        }

        const images = await this.prismaService.productImage.findMany({
            where: { productId },
        });

        if (images.length !== imageIds.length) {
            throw new GraphQLError('Invalid images list', {
                extensions: { code: 'INVALID_INPUT' },
            });
        }

        const dbIds = new Set(images.map(i => i.id));

        for (const id of imageIds) {
            if (!dbIds.has(id)) {
                throw new GraphQLError('Image does not belong to product', {
                    extensions: { code: 'INVALID_INPUT' },
                });
            }
        }

        await this.prismaService.$transaction(
            imageIds.map((id, index) =>
                this.prismaService.productImage.update({
                    where: { id },
                    data: { position: index },
                })
            )
        );

        return true
    }


}
