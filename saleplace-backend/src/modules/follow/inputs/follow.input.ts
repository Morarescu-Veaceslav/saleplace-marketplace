import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class FollowUserInput {
    @Field(() => ID)
    public targetUserId: string;

    // @Field(() => Int, { nullable: true })
    // take?: number;

    // @Field(() => Int, { nullable: true })
    // skip?: number;
}
