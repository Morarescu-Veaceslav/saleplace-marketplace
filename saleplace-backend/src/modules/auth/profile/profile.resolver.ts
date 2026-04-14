import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import type { User } from '@prisma/generated';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { ChangePresetAvatarInput } from './inputs/change-avatar.input';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { SocialLinkInput, SocialLinkOrderInput } from './inputs/social-link.input';
import { PublicSocialLinkModel } from './models/public-social-link.model';
import { ChangePresetAvatarModel } from './models/change-preset-avatar.model';
import { UserInfoModel } from './models/user-info.model';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) { }

  @Authorization()
  @Mutation(() => ChangePresetAvatarModel, { name: 'changeProfileAvatar', nullable: true })
  async changeAvatar(
    @Authorized() user: User,
    @Args('data', { nullable: true })
    data: ChangePresetAvatarInput,
  ) {
    return this.profileService.changePresetAvatar(user, data.preset);
  }


  @Authorization()
  @Mutation(() => ChangePresetAvatarModel, { name: 'removeProfileAvatar' })
  public async removeAvatar(@Authorized() user: User) {
    return this.profileService.removeAvatar(user)
  }


  @Authorization()
  @Mutation(() => UserInfoModel, { name: 'changeProfileInfo' })
  public async changeInfo(
    @Authorized() user: User,
    @Args('data') input: ChangeProfileInfoInput
  ) {
    return this.profileService.changeInfo(user, input)
  }

  @Authorization()
  @Mutation(() => PublicSocialLinkModel, { name: 'createSocialLink' })
  public async createSocialLink(
    @Authorized() user: User,
    @Args('data') input: SocialLinkInput
  ) {
    return this.profileService.createSocialLink(user, input)
  }


  @Authorization()
  @Mutation(() => Boolean, { name: 'reorderSocialLinks' })
  public async reorderSocialLinks(
    @Authorized() user: User,
    @Args('list', { type: () => [SocialLinkOrderInput] })
    list: SocialLinkOrderInput[]
  ) {
    return this.profileService.reorderSocialLinks(user.id, list)
  }

  @Authorization()
  @Mutation(() => PublicSocialLinkModel, { name: 'updateSocialLink' })
  async updateSocialLink(
    @Authorized() user: User,
    @Args('id') id: string,
    @Args('data') input: SocialLinkInput,
  ) {
    return this.profileService.updateSocialLink(user.id, id, input);
  }


  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSocialLink' })
  public async removeSocialLink(
    @Authorized() user: User,
    @Args('id') id: string) {
    return this.profileService.removeSocialLink(user.id, id)
  }

  @Query(() => [PublicSocialLinkModel])
  public async socialLinks(
    @Args('username') username: string,
  ) {
    return this.profileService.findSocialLinksByUsername(username);
  }
}


