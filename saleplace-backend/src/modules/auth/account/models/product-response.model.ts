import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductsModel } from './products.model';

@ObjectType()
export class ProductResponse {

    @Field(() => [ProductsModel])
    items: ProductsModel[];

    @Field(() => String, { nullable: true })
    nextCursor: string | null;

    @Field(() => Boolean)
    hasMore: boolean;
}