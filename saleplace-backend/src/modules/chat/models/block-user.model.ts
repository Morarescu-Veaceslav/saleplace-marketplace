import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AvatarType } from "@prisma/generated";

@ObjectType()
export class BlockUser  {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public username!: string;

    @Field(() => String, { nullable: true })
    public avatar: string | null;

    @Field(() => String)
    public displayName!: string;

    @Field(() => String)
    public avatarType: AvatarType

    @Field(() => Date)
    public createdAt: Date;
}