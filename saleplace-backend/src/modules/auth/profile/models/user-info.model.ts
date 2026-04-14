import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserInfoModel {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    displayName: string;

    @Field(() => String, { nullable: true })
    bio: string | null;
}