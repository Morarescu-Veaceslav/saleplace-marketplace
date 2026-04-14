import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Meta } from './meta-paginate.model';
import { ProductModel } from './product.model';


@ObjectType()
export class PaginatedProducts {

  @Field(() => [ProductModel])
  items: ProductModel[];

  @Field(() => Meta)
  meta: Meta;
}

