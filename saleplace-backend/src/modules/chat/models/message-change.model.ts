import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { MessageModel } from "./message.model";
import { ChatParticipantModel } from "./chat-participant.model";

@ObjectType()
export class MessageChangeModel {
    @Field()
    type: string; // 'CREATE' | 'UPDATE' | 'DELETE'

    @Field(() => ID)
    conversationId: string;

    @Field(() => MessageModel)
    lastMessage: MessageModel;

    @Field(() => ChatParticipantModel)
    participant: ChatParticipantModel;

    @Field(() => Int)
    unreadCount: number;
}