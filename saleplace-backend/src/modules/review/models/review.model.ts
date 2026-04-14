import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { MyReviewProductModel } from './review-product.model';

@ObjectType()
export class MyReviewModel {
  @Field(() => ID)
  public id: string;

  @Field(() => Int, { nullable: true })
  public rating?: number | null;

  @Field(() => String, { nullable: true })
  public comment?: string | null;

  @Field()
  public isDeleted: boolean;

  @Field()
  public createdAt: Date;

  @Field(() => MyReviewProductModel)
  public product: MyReviewProductModel;
}

