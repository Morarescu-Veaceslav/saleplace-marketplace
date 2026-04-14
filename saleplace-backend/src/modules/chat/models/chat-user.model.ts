import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AvatarType } from "@prisma/generated";

@ObjectType()
export class ChatUserModel {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public username: string;

  @Field(() => String, { nullable: true })
  public avatar: string | null;

  @Field(() => String, { nullable: true })
  public avatarType: AvatarType;

  @Field(() => Boolean, { nullable: true })
  public isOnline?: boolean | null;

}
