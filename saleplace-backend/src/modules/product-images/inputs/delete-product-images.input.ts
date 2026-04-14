import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class DeleteProductImagesInput {
    @Field(() => ID)
    @IsUUID()
    @IsString()
    productId: string

    @Field(() => [ID])
    imageIds: string[]
}
