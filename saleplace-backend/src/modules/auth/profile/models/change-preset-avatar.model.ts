import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AvatarType } from "@prisma/generated";

@ObjectType()
export class ChangePresetAvatarModel {
    @Field(() => ID)
    id: string;

    @Field(() => String, { nullable: true })
    avatar: string | null;

    @Field()
    avatarType: AvatarType;
}