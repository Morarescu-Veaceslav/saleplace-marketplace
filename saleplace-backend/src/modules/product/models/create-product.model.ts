import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateProductModel {
  @Field(() => ID)
  public id: string
}
