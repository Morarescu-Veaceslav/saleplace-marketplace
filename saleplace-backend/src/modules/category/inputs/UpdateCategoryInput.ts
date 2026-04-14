import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class UpdateCategoryInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public name?: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public description?: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public icon?: string

    @Field(() => String, { nullable: true })
    @IsUUID()
    @IsString()
    @IsOptional()
    public parentId?: string

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    public isActive?: boolean
}
