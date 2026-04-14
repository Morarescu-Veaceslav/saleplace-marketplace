import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PresenceModel {
  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  isOnline: boolean;
}
