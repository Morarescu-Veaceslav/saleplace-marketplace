import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from './inputs/create-user.input';
import { GraphQLError } from 'graphql';
import { hash, verify } from 'argon2';
import { VerificationService } from '../verification/verification.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ProductStatus, type User } from '@prisma/generated';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ProductService } from 'src/modules/product/product.service';
import { ProfileService } from '../profile/profile.service';
import { UserEmailModel } from './models/user.email.model';
import { UserModel } from './models/user.model';
import { PresenceService } from 'src/modules/chat/presence.service';
import { RedisService } from 'src/core/redis/redis.service';
import { ProductResponse } from './models/product-response.model';
import { Decimal } from '@prisma/generated/runtime/library';

@Injectable()
export class AccountService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly verificationService: VerificationService,
        private readonly presenceService: PresenceService,
    ) { }

    public async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                email: true,
                displayName: true,
                avatar: true,
                avatarType: true,
                bio: true,
                isTotpEnabled: true
            }
        })

        if (!user) {
            throw new GraphQLError('Authenticated user not found', {
                extensions: { code: 'AUTH_USER_NOT_FOUND' },
            });
        }

        const onlineUsers = await this.presenceService.getOnlineUsers();

        const result: UserModel = {
            ...user,
            isOnline: onlineUsers.has(user.id),
        };

        return result;
    }

    public async getUserProducts(
        username: string,
        take = 10,
        cursor?: string
    ): Promise<ProductResponse> {

        const user = await this.prismaService.user.findUnique({
            where: { username },
            select: { id: true },
        })

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }

        const products = await this.prismaService.product.findMany({
            where: {
                userId: user.id,
                status: "ACTIVE",
            },
            take: take + 1,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { createdAt: "desc" },

            select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                images: {
                    orderBy: { position: "asc" },
                    take: 1,
                    select: { url: true },
                },
                createdAt: true,
            },
        })

        const hasMore = products.length > take

        const rowItems = hasMore
            ? products.slice(0, -1)
            : products

        const items = rowItems.map(product => ({
            ...product,
            price: (product.price as Decimal).toNumber(),
            images: product.images[0]?.url ?? null
        }))

        return {
            items,
            nextCursor: hasMore ? items[items.length - 1].id : null,
            hasMore,
        }
    }

    public async getPublicProfile(username: string, currentUserId?: string) {

        const user = await this.prismaService.user.findUnique({
            where: {
                username,
                isDeactivated: false,
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
                avatarType: true,
                bio: true,
                createdAt: true,
            },

        });

        if (!user) return null;
        let isFollowedByCurrentUser = false;

        if (currentUserId) {
            const follow = await this.prismaService.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: currentUserId,
                        followingId: user.id,
                    },
                },
            });

            isFollowedByCurrentUser = !!follow;
        }

        return {
            ...user,
            isOnline: this.presenceService.isOnline(user.id),
            isFollowedByCurrentUser
        };
    }


    public async create(input: CreateUserInput) {

        const { username, email, password } = input

        const user = await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username
            }
        })

        await this.verificationService.sendVerificationToken(user)

        return true

    }

    public async changeEmail(userId: string, input: ChangeEmailInput): Promise<UserEmailModel> {
        const { email, password } = input;

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, password: true },
        });

        if (!user) {
            throw new GraphQLError('Authenticated user not found', {
                extensions: { code: 'AUTH_USER_NOT_FOUND' },
            });
        }

        if (user.email === email) {
            throw new GraphQLError('Email is the same', {
                extensions: { code: 'SAME_EMAIL' },
            });
        }

        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) {
            throw new GraphQLError('Incorrect password', {
                extensions: { code: 'INCORRECT_PASSWORD' },
            });
        }

        const newEmail = await this.prismaService.user.update({
            where: { id: user.id },
            data: { email },
            select: {
                id: true,
                email: true
            }
        });

        return newEmail;
    }


    public async changePassword(user: User, input: ChangePasswordInput): Promise<Boolean> {

        const { oldPassword, newPassword } = input

        const isValidPassword = await verify(user.password, oldPassword)

        if (!isValidPassword) {
            throw new GraphQLError('Incorrect old password.', {
                extensions: {
                    code: 'INCORRECT_OLD_PASSWORD',
                },
            });
        }

        const isSame = await verify(user.password, newPassword);

        if (isSame) {
            throw new GraphQLError('New password cannot be the same as old password.', {
                extensions: { code: 'PASSWORD_SAME_AS_OLD' },
            });
        }

        await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                password: await hash(newPassword)
            }
        })

        return true
    }
}
