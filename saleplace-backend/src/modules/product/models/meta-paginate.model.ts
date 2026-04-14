import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Meta {
  @Field() total: number;
  @Field() page: number;
  @Field() limit: number;
  @Field() totalPages: number;
}
