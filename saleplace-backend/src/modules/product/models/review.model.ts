import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { PublicUserModel } from 'src/modules/auth/account/models/public-user.model';

@ObjectType()
export class ReviewModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  rating: number | null;

  @Field(() => String, { nullable: true })
  comment: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => PublicUserModel)
  user: PublicUserModel;
}
