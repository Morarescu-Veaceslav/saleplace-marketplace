import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { ChatUserModel } from "./chat-user.model";
import { MessageModel } from "./message.model";
import { UserModel } from "src/modules/auth/account/models/user.model";

@ObjectType()
export class ConversationListItemModel {
    @Field(() => ID)
    id: string;

    @Field(() => UserModel)
    participant: UserModel;

    @Field(() => MessageModel, { nullable: true })
    lastMessage?: MessageModel;

    @Field(() => Int)
    unreadCount: number;

    @Field(() => Date)
    updatedAt: Date;
}
