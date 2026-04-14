import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ActorModel {

  @Field(() => String)
  public username: string;

  @Field(() => String, { nullable: true })
  public avatar: string;

  @Field(() => String, { nullable: true })
  public avatarType: string;

}
