import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlanModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Number)
  price: number;

  @Field(() => Int, { nullable: true })
  limit: number | null;
}