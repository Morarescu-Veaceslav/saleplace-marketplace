import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class SubscriptionWarningParams {
  @Field(() => Int)
  remaining: number
}