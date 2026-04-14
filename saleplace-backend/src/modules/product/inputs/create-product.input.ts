import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";


@InputType()
export class CreateProductInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(120)
    public title: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    public description: string

    @Field(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    public price: number

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public categoryId: string

}