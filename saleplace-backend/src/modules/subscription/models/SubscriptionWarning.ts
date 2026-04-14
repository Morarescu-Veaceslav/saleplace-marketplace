import { Field, ObjectType } from '@nestjs/graphql'
import { SubscriptionWarningParams } from './SubscriptionWarningParams'

@ObjectType()
export class SubscriptionWarning {
  @Field()
  code: string

  @Field(() => SubscriptionWarningParams)
  params: SubscriptionWarningParams
}