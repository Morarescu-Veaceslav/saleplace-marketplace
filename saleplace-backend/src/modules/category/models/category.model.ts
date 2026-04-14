import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  public id: string

  @Field(() => String)
  public name: string

  @Field(() => String)
  public slug: string

  @Field(() => String, { nullable: true })
  public description: string | null

  @Field(() => String, { nullable: true })
  public icon: string | null

  @Field()
  public isActive: boolean

  @Field(() => String, { nullable: true })
  public parentId: string | null

  @Field(() => [CategoryModel], { nullable: 'itemsAndList' })
  public children?: CategoryModel[]
}
