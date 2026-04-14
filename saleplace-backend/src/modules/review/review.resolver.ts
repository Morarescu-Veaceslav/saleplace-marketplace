import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { CreateReviewInput } from './inputs/create-review.input';
import { UpdateReviewInput } from './inputs/update-review.input';
import { DeleteReviewInput } from './inputs/delete-review.input';
import { MyReviewModel } from './models/review.model';
import { RestoreReviewInput } from './inputs/restore-review.input';
import { ReviewModel } from '../product/models/review.model';

@Resolver('Review')
export class ReviewResolver {
  public constructor(private readonly reviewService: ReviewService) { }

  @Authorization()
  @Mutation(() => ReviewModel, { name: 'createReview' })
  async createReview(
    @Authorized() user: User,
    @Args('data') input: CreateReviewInput
  ) {
    return this.reviewService.createReview(user, input)
  }


  @Authorization()
  @Mutation(() => ReviewModel, { name: 'editReview' })
  async editReview(
    @Authorized() user: User,
    @Args('data') input: UpdateReviewInput
  ) {
    return this.reviewService.updateReview(user, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteReview' })
  async deleteReview(
    @Authorized() user: User,
    @Args('data') input: DeleteReviewInput
  ) {
    return this.reviewService.deleteReview(user, input)
  }

  @Authorization()
  @Query(() => [MyReviewModel], { name: 'myReviews' })
  async myReviews(@Authorized() user: User) {
    return this.reviewService.myReviews(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'restoreReview' })
  async restoreReview(
    @Authorized() user: User,
    @Args('data') input: RestoreReviewInput,
  ) {
    return this.reviewService.restoreReview(user, input);
  }

}
