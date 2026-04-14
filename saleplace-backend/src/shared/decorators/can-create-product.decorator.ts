import { applyDecorators, UseGuards } from "@nestjs/common";
import { CanCreateProductGuard } from "../guards/gql-can-create-product.guard";
import { GqlAuthGuard } from "../guards/gql-auth.guard";

export function CanCreateProduct() {
    return applyDecorators(UseGuards(GqlAuthGuard, CanCreateProductGuard))
}