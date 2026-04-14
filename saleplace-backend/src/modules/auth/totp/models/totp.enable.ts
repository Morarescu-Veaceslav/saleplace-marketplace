import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TotpEnable {

    @Field(() => ID)
    public id: string;
    
    @Field(() => Boolean)
    public isTotpEnabled: boolean

}