import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ProductStatus, ProductStatusType } from '../enums/product-status.enum';

@InputType()
export class UpdateProductInput {
    @Field(() => String)
    @IsUUID()
    public productId: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    public title?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    public description?: string

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    public price?: number

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUUID()
    public categoryId?: string

    @Field(() => ProductStatus, { nullable: true })
    @IsOptional()
    status?: ProductStatusType
}
