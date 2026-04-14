import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionsPagination {

    @Field(() => Int)
    total: number

    @Field(() => Int)
    take: number

    @Field(() => Int)
    skip: number
}