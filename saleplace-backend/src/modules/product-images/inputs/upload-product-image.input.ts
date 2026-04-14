import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class UploadProductImagesInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  public productId: string

  @Field(() => String)
  public files: string 

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  public positions?: number[]
}
