import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeactivateAccountResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => Date, { nullable: true })
  deactivatedAt?: Date;
}