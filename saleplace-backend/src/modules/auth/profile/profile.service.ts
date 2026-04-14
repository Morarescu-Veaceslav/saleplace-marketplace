import { Injectable, Logger } from '@nestjs/common';
import type { User } from '@prisma/generated';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { StorageService } from 'src/modules/libs/storage/storage.service';
import { GraphQLError } from 'graphql';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { SocialLinkInput, SocialLinkOrderInput } from './inputs/social-link.input';
import { assertAffected } from 'src/common/helpers/assert-affected';
import { ChangePresetAvatarModel } from './models/change-preset-avatar.model';
import { UserInfoModel } from './models/user-info.model';
import { PublicSocialLinkModel } from './models/public-social-link.model';

@Injectable()
export class ProfileService {

    private readonly logger = new Logger(ProfileService.name);

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService
    ) { }


    async setCustomAvatar(userId: string, upload: { publicId: string; version: number }): Promise<ChangePresetAvatarModel> {
        const avatarValue = `v${upload.version}/${upload.publicId}`;

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: {
                avatar: true,
                avatarType: true
            }
        });

        if (!user) {
            throw new GraphQLError('User not found.', {
                extensions: {
                    code: 'USER_NOT_FOUND',
                },
            });
        }

        if (user.avatarType === 'CUSTOM' && user.avatar) {
            await this.storageService.deleteImage(user.avatar);
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: {
                avatar: avatarValue,
                avatarType: 'CUSTOM',
            },
            select: {
                id: true,
                avatar: true,
                avatarType: true
            }
        });

        return updatedUser;
    }

    // public async changeCustomAvatar(user: User, file: Promise<FileUpload>) {

    //     const filename = await file;

    //     const avatarValue = await this.storageService.uploadFile(filename, 'avatars', 512, 512);

    //     await this.prismaService.user.update({
    //         where: { id: user.id },
    //         data: {
    //             avatar: avatarValue,
    //             avatarType: 'CUSTOM',
    //         },
    //     });

    //     if (user.avatarType === 'CUSTOM' && user.avatar) {
    //         try {
    //             await this.storageService.deleteImage(user.avatar);
    //         } catch (err) {
    //             this.logger.warn(
    //                 `Failed to delete old custom avatar for user ${user.id}`,
    //                 err,
    //             );
    //         }
    //     }

    //     return true
    // }

    public async changePresetAvatar(user: User, preset: string): Promise<ChangePresetAvatarModel> {

        const validPresets = ['avatar_1', 'avatar_2', 'avatar_3', 'avatar_4', 'avatar_5'];

        if (!validPresets.includes(preset)) {

            throw new GraphQLError('Invalid preset selected avatar.', {
                extensions: {
                    code: 'INVALID_PRESET_SELECTED_AVATAR',
                },
            });
        }

        if (user.avatarType === 'CUSTOM' && user.avatar) {
            try {
                await this.storageService.deleteImage(user.avatar);
            } catch (err) {
                this.logger.warn(
                    `Failed to delete avatar for user ${user.id}`,
                    err,
                );
            }
        }

        const presetAvatar = this.prismaService.user.update({
            where: { id: user.id },
            data: {
                avatar: preset,
                avatarType: 'PRESET',
            },
            select: {
                id: true,
                avatar: true,
                avatarType: true
            }

        });

        return presetAvatar;
    }

    public async removeAvatar(user: User) {

        if (!user.avatar) {
            return
        }
        if (user.avatarType === 'CUSTOM') {
            await this.storageService.deleteImage(user.avatar);
        }
        const presetAvatar = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                avatar: 'avatar_1',
                avatarType: 'PRESET',
            },
            select: {
                id: true,
                avatar: true,
                avatarType: true
            }

        })

        return presetAvatar
    }


    public async changeInfo(user: User, input: ChangeProfileInfoInput): Promise<UserInfoModel> {

        const { username, displayName, bio } = input

        const userInfo = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                username,
                displayName,
                bio
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                bio: true
            }
        })

        return userInfo;
    }

    public async findSocialLinksByUsername(username: string) {

        return this.prismaService.socialLink.findMany({
            where: {
                user: {
                    username,
                    isDeactivated: false,
                },
            },
            orderBy: { position: 'asc' },
        });
    }

    public async createSocialLink(user: User, input: SocialLinkInput): Promise<SocialLinkInput> {
        const { title, url } = input

        const lastSocialLink = await this.prismaService.socialLink.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                position: 'desc'
            }
        })

        const newPosition = lastSocialLink ? lastSocialLink.position + 1 : 1

        const userSocialLinks = await this.prismaService.socialLink.create({
            data: {
                title,
                url,
                position: newPosition,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        return userSocialLinks
    }

    public async reorderSocialLinks(userId: string, list: SocialLinkOrderInput[]) {

        if (!list.length) {
            return
        }

        await this.prismaService.$transaction(
            list.map(link =>
                this.prismaService.socialLink.update({
                    where: {
                        id: link.id,
                        userId: userId
                    },
                    data: { position: link.position },
                }),
            ),
        );

        return true
    }


    public async updateSocialLink(
        userId: string,
        id: string,
        input: SocialLinkInput
    ): Promise<PublicSocialLinkModel> {

        const link = await this.prismaService.socialLink.update({
            where: {
                id_userId: {
                    id,
                    userId,
                },
            },
            data: {
                title: input.title,
                url: input.url,
            },
            select: {
                id: true,
                title: true,
                url: true,
                position:true
            },
        })

        return link
    }

    public async removeSocialLink(userId: string, id: string): Promise<boolean> {

        await this.prismaService.socialLink.delete({
            where: {
                id,
                userId
            }
        })

        return true
    }

}
