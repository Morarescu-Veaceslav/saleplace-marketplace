import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './models/user.model';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { AdminOnly } from 'src/shared/decorators/admin.decorator';
import { Blocked } from 'src/shared/decorators/blocked.decorator';
import { User } from '@prisma/generated';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { PublicUserModel } from './models/public-user.model';
import { OptionalAuth } from 'src/shared/decorators/optional-auth.decorator';
import { UserEmailModel } from './models/user.email.model';
import { ProductResponse } from './models/product-response.model';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) { }

  @OptionalAuth()
  @Query(() => UserModel, { name: 'findProfile', nullable: true })
  async findAll(@Authorized() user: User) {
    if (!user) return null
    return this.accountService.me(user.id);
  }

  @OptionalAuth()
  @Query(() => ProductResponse, { name: 'getUserProducts'})
  async products(
    @Args('username') username: string,

    @Args('take', { type: () => Int, nullable: true })
    take?: number,

    @Args('cursor', { type: () => String, nullable: true })
    cursor?: string,
  ) {
    return this.accountService.getUserProducts(username, take, cursor)
  }

  @OptionalAuth()
  @Query(() => PublicUserModel, { name: 'publicProfile', nullable: true })
  async publicProfile(
    @Args('username') username: string,
    @Authorized() user: User
  ) {
    return this.accountService.getPublicProfile(username, user?.id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  public async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input)
  }

  @Authorization()
  @Mutation(() => UserEmailModel, { name: 'changeEmail' })
  public async changeEmail(
    @Authorized() user: User,
    @Args('data') input: ChangeEmailInput
  ) {
    return this.accountService.changeEmail(user.id, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changePassword' })
  public async changePassword(
    @Authorized() user: User,
    @Args('data') input: ChangePasswordInput
  ) {
    return this.accountService.changePassword(user, input)
  }
}
