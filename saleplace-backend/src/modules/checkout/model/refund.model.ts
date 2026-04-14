import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RefundResponse {
    @Field()
    refundId: string;

    @Field()
    status: string;
}
