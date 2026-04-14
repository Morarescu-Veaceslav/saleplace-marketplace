import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductsModel {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    slug: string;

    @Field(() => Float)
    price: number;

    @Field(() => String, { nullable: true })
    images: string | null

    @Field(() => Date)
    createdAt: Date;
}