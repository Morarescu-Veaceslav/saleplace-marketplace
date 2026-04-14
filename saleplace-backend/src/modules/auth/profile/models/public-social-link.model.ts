import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PublicSocialLinkModel {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    url: string;

    @Field(() => Number)
    position: number;
}