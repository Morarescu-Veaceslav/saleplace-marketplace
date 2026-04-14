import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { CheckoutResponse } from './model/checkout.model';
import { RefundResponse } from './model/refund.model';

@Resolver('Checkout')
export class CheckoutResolver {
  public constructor(private readonly checkoutService: CheckoutService) { }

  @Authorization()
  @Mutation(() => CheckoutResponse, { name: 'byProduct' })
  async byProduct(
    @Authorized() user: User,
    @Args('productId') productId: string
  ): Promise<CheckoutResponse> {
    return this.checkoutService.createOrder(productId, user.id)
  }

  @Authorization()
  @Mutation(() => RefundResponse, { name: 'refund' })
  async refund(
    @Authorized() user: User,
    @Args('orderId') orderId: string
  ): Promise<RefundResponse> {
    return this.checkoutService.refundOrder(orderId, user.id)
  }

}
