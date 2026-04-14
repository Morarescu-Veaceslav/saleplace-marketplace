import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteReviewInput {
    @Field(() => String)
    @IsUUID()
    public reviewId: string;

}