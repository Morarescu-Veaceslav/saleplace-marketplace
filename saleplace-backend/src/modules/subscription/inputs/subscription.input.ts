import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SubscriptionInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public planId: string
}
