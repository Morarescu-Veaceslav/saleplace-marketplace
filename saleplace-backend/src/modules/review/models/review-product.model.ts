import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MyReviewProductModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}
