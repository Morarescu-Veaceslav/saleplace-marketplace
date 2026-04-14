import { ObjectType, Field } from '@nestjs/graphql';
import { SubscriptionWarning } from './SubscriptionWarning';

@ObjectType()
export class SubscriptionResponse {
    @Field()
    url: string;

    @Field(() => SubscriptionWarning, { nullable: true })
    warning: SubscriptionWarning | null
}
