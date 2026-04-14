import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { FollowUserInput } from './inputs/follow.input';
import { FollowPagination } from './models/follow.pagination';
import { UnfollowUserInput } from './inputs/unfollow.input';
import { FollowingsInput } from './inputs/followings.input';
import { OptionalAuth } from 'src/shared/decorators/optional-auth.decorator';

@Resolver('Follow')
export class FollowResolver {
  public constructor(private readonly followService: FollowService) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'followUser' })
  async followUser(
    @Authorized() user: User,
    @Args('data') data: FollowUserInput
  ): Promise<boolean> {
    return this.followService.follow(user.id, data.targetUserId);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'unfollowUser' })
  async unfollowUser(
    @Authorized() user: User,
    @Args('data') data: UnfollowUserInput
  ): Promise<boolean> {
    return this.followService.unfollow(user.id, data.targetUserId);
  }

  @Authorization()
  @Query(() => FollowPagination, { name: 'findMyFollowings' })
  public async findMyFollowings(
    @Authorized() user: User,
    @Args('pagination', { nullable: true })
    pagination?: FollowingsInput,
  ) {
    return this.followService.findMyFollowings(user.id, pagination)
  }


  @OptionalAuth()
  @Query(() => FollowPagination, { name: 'findMyFollowers' })
  public async findMyFollowers(
    @Authorized() user: User | null,
    @Args('username', { nullable: true }) username: string,
    @Args('pagination', { nullable: true })
    pagination?: FollowingsInput,
  ) {
    return this.followService.findMyFollowers(user?.id ?? null, username, pagination)
  }
}
