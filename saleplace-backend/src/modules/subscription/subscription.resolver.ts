import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { SubscriptionInput } from './inputs/subscription.input';
import { SubscriptionResponse } from './models/subscription.model';
import { GetSubscriptionResponse } from './models/subscription-get.model';
import { CanceledSubscription } from './models/subscription-canceled';
import { SubscriptionPlanResponse } from './models/subscription-plan';

@Resolver('Subscription')
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Authorization()
  @Mutation(() => SubscriptionResponse, { name: 'subscription' })
  async byProduct(
    @Authorized() user: User,
    @Args('planId') planId: string
  ): Promise<SubscriptionResponse> {
    return this.subscriptionService.makePayment(user, planId)
  }

  @Authorization()
  @Mutation(() => CanceledSubscription, { name: 'cancelSubscription' })
  async cancelSubscription(
    @Authorized() user: User,
  ): Promise<CanceledSubscription> {
    return this.subscriptionService.cancelSubscription(user.id)
  }


  @Authorization()
  @Query(() => [GetSubscriptionResponse], { name: 'getSubscription' })
  async getSubscription(
    @Authorized() user: User
  ): Promise<GetSubscriptionResponse[]> {
    return this.subscriptionService.getSubscription(user.id)
  }

  @Query(() => [SubscriptionPlanResponse], { name: 'subscriptionPlans' })
  async subscriptionPlan(): Promise<SubscriptionPlanResponse[]> {
    return this.subscriptionService.subscriptionPlans()
  }

}
