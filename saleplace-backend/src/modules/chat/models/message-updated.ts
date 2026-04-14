import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MessageUpdated {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    content: string;

    @Field(() => Date, { nullable: true })
    updatedAt: Date | null;
}