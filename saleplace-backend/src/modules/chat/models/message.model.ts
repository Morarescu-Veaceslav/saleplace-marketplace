import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ChatUserModel } from "./chat-user.model";
import { ConversationListItemModel } from "./conversation-list.model";

@ObjectType()
export class MessageModel {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => ChatUserModel, { nullable: true })
  sender: ChatUserModel | null;

  @Field(() => ID)
  conversationId: string;

  @Field(() => String, { nullable: true })
  updatedAt: Date | null;

  @Field(() => String)
  createdAt: Date;

  @Field(() => Boolean)
  deleted: boolean

  @Field(() => String, { nullable: true })
  type: string | null

}
