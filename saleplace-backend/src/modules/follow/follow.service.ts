import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { EventbusService } from 'src/core/eventbus/eventbus.service';
import { FollowingsInput } from './inputs/followings.input';
import { FollowingUser } from './models/following.model';
import { FollowPagination } from './models/follow.pagination';

@Injectable()
export class FollowService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly eventBus: EventbusService
    ) { }

    async follow(
        followerId: string,
        followingId: string
    ): Promise<boolean> {

        if (followerId === followingId) {
            throw new GraphQLError('You cannot follow yourself', {
                extensions: { code: 'FOLLOW_SELF' },
            });
        }

        const [follower, following] = await this.prismaService.user.findMany({
            where: { id: { in: [followerId, followingId] } },
        });

        if (!follower || !following) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            });
        }

        const exists = await this.prismaService.follow.findUnique({
            where: {
                followerId_followingId: { followerId, followingId },
            },
        });

        if (exists) {
            return true
        }
        await this.prismaService.$transaction([
            this.prismaService.follow.create({
                data: { followerId, followingId },
            }),
            this.prismaService.user.update({
                where: { id: followingId },
                data: { followersCount: { increment: 1 } },
            }),
            this.prismaService.user.update({
                where: { id: followerId },
                data: { followingCount: { increment: 1 } },
            })
        ]);

        this.eventBus.emit('follow.created', {
            followerId,
            followingId,
        });

        return true
    }


    async unfollow(followerId: string, followingId: string): Promise<boolean> {
        await this.prismaService.$transaction(async (tx) => {

            const follow = await tx.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
            });

            if (!follow) {
                return
            }

            await tx.follow.deleteMany({ where: { followerId, followingId } });

            const [fUser, tUser] = await Promise.all([
                tx.user.findUnique({ where: { id: followerId } }),
                tx.user.findUnique({ where: { id: followingId } }),
            ]);

            if (!fUser || !tUser) {
                throw new GraphQLError('User not found', {
                    extensions: { code: 'USER_NOT_FOUND' }
                });
            }

            await Promise.all([
                tx.user.update({
                    where: { id: followingId },
                    data: { followersCount: Math.max(0, (tUser.followersCount ?? 0) - 1) },
                }),
                tx.user.update({
                    where: { id: followerId },
                    data: { followingCount: Math.max(0, (fUser.followingCount ?? 0) - 1) },
                }),
            ]);
        });

        return true
    }


    async findMyFollowings(
        userId: string,
        pagination: FollowingsInput = {},
    ) {
        return this.findFollows(
            { followerId: userId },
            'following',
            pagination
        );
    }

    async findMyFollowers(
        currentUserId: string | null,
        username: string,
        pagination: FollowingsInput = {},
    ) {

        const user = await this.prismaService.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            });
        }
        return this.findFollows(
            { followingId: user.id },
            'follower',
            pagination,
            currentUserId,
        );
    }

    private async findFollows(
        where: any,
        relation: 'follower' | 'following',
        pagination: FollowingsInput,
        currentUserId?: string | null,
    ){

        const take = pagination.take ?? 12;
        const skip = pagination.skip ?? 0;

        const [items, total, myFollowings] = await Promise.all([
            this.prismaService.follow.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                select: {
                    createdAt: true,
                    [relation]: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                            avatarType: true,
                        },
                    },
                },
            }),

            this.prismaService.follow.count({ where }),

            currentUserId
                ? this.prismaService.follow.findMany({
                    where: { followerId: currentUserId },
                    select: { followingId: true },
                })
                : Promise.resolve([]),
        ]);

        const followingSet = new Set(
            (myFollowings as any[]).map(f => f.followingId)
        );

        return {
            items: items.map((f: any) => {
                const targetUser = f[relation];

                return {
                    id: targetUser.id,
                    username: targetUser.username,
                    displayName: targetUser.displayName,
                    avatar: targetUser.avatar,
                    avatarType: targetUser.avatarType,
                    createdAt: f.createdAt,

                    isFollowedByCurrentUser: currentUserId
                        ? followingSet.has(targetUser.id)
                        : null,
                };
            }),
            total,
            take,
            skip,
        };
    }
}



