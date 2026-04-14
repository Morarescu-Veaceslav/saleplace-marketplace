import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ProductsFilterInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  sortBy?: 'views' | 'createdAt' | 'price';
}
