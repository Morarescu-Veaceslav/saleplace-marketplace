import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryTreeNode {
  @Field(() => ID)
  public id: string

  @Field()
  public name: string

  @Field()
  public slug: string

  @Field({ nullable: true })
  public icon?: string | null

  @Field(() => [CategoryTreeNode])
  public children: CategoryTreeNode[]
}
