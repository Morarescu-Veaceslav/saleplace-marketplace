import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { FollowingUser } from './following.model';


@ObjectType()
export class FollowPagination {
    @Field(() => [FollowingUser])
    items: FollowingUser[]

    @Field(() => Int)
    total: number

    @Field(() => Int)
    take: number

    @Field(() => Int)
    skip: number
}