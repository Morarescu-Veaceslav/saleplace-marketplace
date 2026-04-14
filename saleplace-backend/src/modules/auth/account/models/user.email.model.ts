import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserEmailModel {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;
}