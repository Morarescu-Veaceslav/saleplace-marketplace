import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ChangePresetAvatarInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  preset: string;
}