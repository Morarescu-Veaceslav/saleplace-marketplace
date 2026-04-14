import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public name: string

    @Field(() => String, { nullable: true })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    public description?: string | null

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public icon?: string | null

    @Field(() => Boolean)
    @IsBoolean()
    public isActive: boolean

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    parentId?: string

}