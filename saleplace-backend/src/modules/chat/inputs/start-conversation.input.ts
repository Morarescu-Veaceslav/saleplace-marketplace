import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class StartConversationInput {
  @Field(() => ID)
  userId: string
}
