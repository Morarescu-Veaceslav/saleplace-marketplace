import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { MessageModel } from "./message.model";

@ObjectType()
export class MessagePage {
    @Field(() => [MessageModel])
    messages: MessageModel[]

    @Field(() => Int)
    totalCount: number
}