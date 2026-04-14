import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionPlanResponse {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(() => Number, { nullable: true })
    productLimit: number | null;

    @Field(() => Number)
    price: number
}