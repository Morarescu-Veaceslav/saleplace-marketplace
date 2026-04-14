import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { CreateProductInput } from './inputs/create-product.input';
import { ProductModel } from './models/product.model';
import { Blocked } from 'src/shared/decorators/blocked.decorator';
import { UpdateProductInput } from './inputs/update-product.input';
import { DeleteProductInput } from './inputs/delete-product.input';
import { PaginatedProducts } from './models/paginate-product.model';
import { ProductsFilterInput } from './inputs/filtre-product.input';
import { OptionalAuth } from 'src/shared/decorators/optional-auth.decorator';
import { CurrentViewer } from 'src/shared/decorators/current-viewer.decorator';
import { Viewer } from '@shared/viewer.types';
import { CanCreateProduct } from 'src/shared/decorators/can-create-product.decorator';
import { CreateProductModel } from './models/create-product.model';
@Resolver('Product')
export class ProductResolver {
  public constructor(private readonly productService: ProductService) { }

  @Authorization()
  @Blocked()
  @CanCreateProduct()
  @Mutation(() => CreateProductModel, { name: 'createProduct' })
  public async create(
    @Authorized() user: User,
    @Args('data') input: CreateProductInput
  ) {
    return this.productService.create(input, user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateProduct' })
  async updateProdcut(
    @Authorized() user: User,
    @Args('data') input: UpdateProductInput
  ) {
    return this.productService.update(input, user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'publishProduct' })
  async publishProduct(
    @Authorized() user: User,
    @Args('productId') productId: string
  ) {
    return this.productService.publishProduct(productId, user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteProduct' })
  async deleteProdcut(
    @Authorized() user: User,
    @Args('data') input: DeleteProductInput
  ) {
    return this.productService.deleteProduct(input, user)
  }

  @Query(() => ProductModel, { name: 'getOne' })
  async getOne(@Args('id') id: string) {
    return this.productService.getOne(id)
  }

  @Query(() => PaginatedProducts, { name: 'filters' })
  async products(
    @Args('filters', { nullable: true })
    filters?: ProductsFilterInput,
  ) {
    return this.productService.getAll(filters ?? {});
  }
  @OptionalAuth()
  @Mutation(() => Boolean, { name: 'trackProductView' })
  async productView(
    @CurrentViewer() viewer: Viewer,
    @Args('productId') productId: string,
  ) {

    return this.productService.trackProductView(productId, viewer.id)
  }

}
