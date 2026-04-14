import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class DeleteProductInput {
    @Field(() => ID)
    @IsUUID()
    @IsString()
    productId: string
}
