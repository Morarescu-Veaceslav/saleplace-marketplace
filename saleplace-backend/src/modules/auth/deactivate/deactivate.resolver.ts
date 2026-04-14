import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { DeactivateService } from './deactivate.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { GqlContext } from '@shared/gql-context.type';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import type { User } from '@prisma/generated';
import { Blocked } from 'src/shared/decorators/blocked.decorator';
import { DeactivateAccountResult } from './models/deactivate.model';

@Resolver('Deactivate')
export class DeactivateResolver {
  public constructor(private readonly deactivateService: DeactivateService) { }

  @Authorization()
  @Blocked()
  @Mutation(() => DeactivateAccountResult, { name: 'deactivateAccount' })
  public async deactivate(
    @Context() { req }: GqlContext,
    @Args('data') input: DeactivateAccountInput,
    @Authorized() user: User,
    @UserAgent() userAgent: string
  ) {
    return this.deactivateService.deactivate(req, input, user, userAgent)
  }
}
