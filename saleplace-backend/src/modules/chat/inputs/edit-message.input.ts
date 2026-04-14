import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class EditMessage {
    @Field(() => ID)
    messageId: string

    @Field(() => String)
    @IsString()
    newContent: string
}
