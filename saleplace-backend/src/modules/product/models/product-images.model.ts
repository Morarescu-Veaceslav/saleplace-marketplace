import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductImageModel {
  @Field(() => ID)
  public id: string

  @Field(() => String, { nullable: true })
  public url: string | null

  @Field(() => Number)
  public position: number;
}
