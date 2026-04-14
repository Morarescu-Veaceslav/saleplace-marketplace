import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TotpService } from './totp.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { TotpModel } from './models/totp.model';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import type { User } from '@prisma/generated';
import { EnableTotpInput } from './inputs/enable-totp.input';
import { Blocked } from 'src/shared/decorators/blocked.decorator';
import { TotpDisable } from './models/totp.disable';
import { TotpEnable } from './models/totp.enable';

@Resolver('Totp')
export class TotpResolver {
  public constructor(private readonly totpService: TotpService) { }

  @Authorization()
  @Query(() => TotpModel, { name: 'generateTotpSecret' })
  public async generate(@Authorized() user: User) {
    return this.totpService.generate(user)
  }

  @Authorization()
  @Mutation(() => TotpEnable, { name: 'enableTotp' })
  public async enable(
    @Authorized() user: User,
    @Args('data') input: EnableTotpInput
  ) {
    return this.totpService.enable(user, input)
  }

  @Authorization()
  @Mutation(() => TotpDisable, { name: 'disableTotp' })
  public async disable(@Authorized() user: User) {
    return this.totpService.disable(user)
  }
}
