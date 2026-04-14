import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductImagesService } from './product-images.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { DeleteProductImagesInput } from './inputs/delete-product-images.input';

@Resolver('ProductImage')
export class ProductImagesResolver {
  public constructor(private readonly productImagesService: ProductImagesService) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteProductImages' })
  public async deleteProductImages(
    @Authorized() user: User,
    @Args('data') input: DeleteProductImagesInput
  ) {
    return this.productImagesService.deleteProductImages(input, user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'updateImagesPosition' })
  public async updateImagesPosition(
    @Authorized() user: User,
    @Args('data') input: DeleteProductImagesInput
  ) {
    return this.productImagesService.updateImagesPosition(input, user)
  }
}
