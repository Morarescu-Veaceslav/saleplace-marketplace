import { registerEnumType } from '@nestjs/graphql';
import { ProductStatus as PrismaProductStatus } from '@prisma/generated';

export const ProductStatus = PrismaProductStatus

registerEnumType(ProductStatus, {
    name: 'ProductStatus'
});

export type ProductStatusType = keyof typeof ProductStatus;