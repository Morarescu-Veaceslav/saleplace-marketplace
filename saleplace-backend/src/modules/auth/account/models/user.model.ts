import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvatarType } from '@prisma/generated';

@ObjectType()
export class UserModel {
    @Field(() => ID)
    public id!: string;

    @Field(() => String)
    public email!: string;

    @Field(() => String)
    public username!: string;

    @Field(() => String, { nullable: true })
    public avatar: string | null;

    @Field(() => String)
    public displayName!: string;

    @Field(() => String)
    public avatarType: AvatarType

    @Field(() => String, { nullable: true })
    public bio: string | null;

    @Field(() => Boolean)
    public isTotpEnabled: boolean;

    @Field(() => Boolean, { nullable: true })
    isOnline: boolean | null;

    // @Field(() => Boolean)
    // public isVerified: boolean

    // @Field(() => Boolean)
    // public isEmailVerified: boolean

    // @Field(() => Boolean)
    // public isTotpEnabled: boolean;

    // @Field(() => String, { nullable: true })
    // public totpSecret: string | null;

    // @Field(() => Boolean)
    // public isDeactivated: boolean;

    // @Field(() => Date, { nullable: true })
    // public deactivatedAt: Date | null;

    // @Field(() => [PublicSocialLinkModel])
    // public socialLinks: PublicSocialLinkModel[]

    // @Field(() => [ProductModel], { nullable: true })
    // products?: ProductModel[]

    // @Field(() => Date, { nullable: true })
    // public blockedUntil: Date | null

    // @Field(() => Date)
    // public updatedAt!: Date;

}
