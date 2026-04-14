import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  public rating?: number;


  @Field(() => String, { nullable: true })
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  public comment?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public productId: string;
}