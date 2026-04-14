import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { CategoryModel } from 'src/modules/category/models/category.model'
import { ProductImageModel } from './product-images.model'
import { PublicUserModel } from 'src/modules/auth/account/models/public-user.model'
import { ReviewModel } from './review.model'
import { ProductStatus } from '@prisma/generated'

@ObjectType()
export class ProductModel {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public title: string

    @Field(() => String, { nullable: true })
    public slug: string | null

    @Field(() => String)
    public description: string

    @Field(() => Float)
    public price: number

    @Field(() => Number)
    public views: number

    @Field(() => ProductStatus)
    status: ProductStatus

    @Field(() => Float)
    public averageRating: number

    @Field(() => Float)
    public reviewsCount: number

    @Field(() => [ProductImageModel], { nullable: true })
    public images: ProductImageModel[] | null

    @Field(() => CategoryModel, { nullable: true })
    public category: CategoryModel | null

    @Field(() => PublicUserModel)
    user: PublicUserModel;

    @Field(() => [ReviewModel], { nullable: true })
    reviews: ReviewModel[] | null

    @Field(() => Date)
    public createdAt: Date
}
