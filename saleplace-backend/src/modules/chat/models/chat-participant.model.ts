import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AvatarType } from "@prisma/generated";

@ObjectType()
export class ChatParticipantModel {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field(() => String, { nullable: true })
    avatar: string | null;

    @Field(() => String)
    avatarType: AvatarType;

    @Field(() => Boolean, { nullable: true })
    isOnline?: boolean | null;
}