import { ObjectType, Field } from '@nestjs/graphql';
import { PlanModel } from './plan.model';
import { SubscriptionStatus } from '@prisma/generated';

@ObjectType()
export class GetSubscriptionResponse {
  @Field()
  id: string;

  @Field()
  status: SubscriptionStatus;

  @Field(() => String, { nullable: true })
  interval: string | null;

  @Field(() => Number)
  productUser: number

  @Field(() => PlanModel)
  plan: PlanModel;

  @Field(() => Date)
  currentPeriodStart: Date;

  @Field(() => Date)
  currentPeriodEnd: Date;
}