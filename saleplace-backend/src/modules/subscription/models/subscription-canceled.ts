import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubscriptionStatus } from '@prisma/generated';

@ObjectType()
export class CanceledSubscription {
    @Field()
    id: string;

    @Field()
    status: SubscriptionStatus;
}