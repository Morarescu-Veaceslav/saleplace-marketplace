import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UnfollowUserInput {
    @Field(() => ID)
    public targetUserId: string;
}