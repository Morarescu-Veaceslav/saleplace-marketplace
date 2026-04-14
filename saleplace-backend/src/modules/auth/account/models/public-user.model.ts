import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AvatarType } from "@prisma/generated";

@ObjectType()
export class PublicUserModel {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public username: string;

  @Field(() => String)
  public displayName: string;

  @Field(() => String, { nullable: true })
  public avatar: string | null;

  @Field(() => String)
  avatarType: AvatarType;

  @Field(() => String, { nullable: true })
  public bio: string | null;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Boolean, { nullable: true })
  isOnline?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  isFollowedByCurrentUser?: boolean | null
}
