import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateReviewInput {
    @Field(() => String)
    @IsUUID()
    public reviewId: string;

    @Field(() => Number, { nullable: true })
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    public rating?: number | null;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    public comment?: string | null;
}
