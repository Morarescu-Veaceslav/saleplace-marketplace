import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BlockUser } from './block-user.model';

@ObjectType()
export class BlockUserPagination {
    @Field(() => [BlockUser])
    items: BlockUser[]

    @Field(() => Int)
    total: number

    @Field(() => Int)
    take: number

    @Field(() => Int)
    skip: number
}