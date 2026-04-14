import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PUB_SUB } from 'src/core/pubsub/pubsub.constants';
import { GraphQLError } from 'graphql';
import { EditMessage } from './inputs/edit-message.input';
import { ItemPaginationInput } from './inputs/item-pagination';
import { PresenceService } from './presence.service';
import { MessageUpdated } from './models/message-updated';
import { BlockUserPagination } from './models/block-user-pagination.model';
import { BlockUserInput } from './inputs/block-user.input';
import { BlockUser } from './models/block-user.model';

@Injectable()
export class ChatService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(PUB_SUB)
        private readonly pubSub: PubSub,
        private readonly presenceService: PresenceService
    ) { }

    async startConversation(
        currentUserId: string,
        otherUserId: string,
    ) {
        if (currentUserId === otherUserId) {
            throw new GraphQLError('Cannot start conversation with yourself', {
                extensions: { code: 'START_CONVERSATION_ERROR' },
            });
        }

        const [userAId, userBId] =
            currentUserId < otherUserId
                ? [currentUserId, otherUserId]
                : [otherUserId, currentUserId];

        let conversation = await this.prismaService.conversation.findUnique({
            where: {
                userAId_userBId: { userAId, userBId },
            },
            include: {
                conversationParticipants: true,
            },
        });

        if (conversation) {
    
            const participant = conversation.conversationParticipants.find(
                (p) => p.userId === currentUserId
            );

            if (participant?.deletedAt) {
                await this.prismaService.conversationParticipant.updateMany({
                    where: { conversationId: conversation.id, userId: currentUserId },
                    data: { deletedAt: null },
                });
            }
        } else {
      
            conversation = await this.prismaService.conversation.create({
                data: {
                    userAId,
                    userBId,
                    conversationParticipants: {
                        createMany: {
                            data: [
                                { userId: userAId },
                                { userId: userBId },
                            ],
                        },
                    },
                },
                include: {
                    conversationParticipants: true,
                },
            });
        }

        const [fullConversation, onlineUsers] = await Promise.all([
            this.prismaService.conversation.findUnique({
                where: { id: conversation.id },
                include: {
                    messages: {
                        take: 1,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatar: true,
                                    avatarType: true,
                                },
                            },
                        },
                    },
                    conversationParticipants: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatar: true,
                                    avatarType: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.presenceService.getOnlineUsers(),
        ]);

        if (!fullConversation) {
            throw new GraphQLError('Conversation not found', {
                extensions: { code: 'CONVERSATION_NOT_FOUND' },
            });
        }

        const participantUser = fullConversation.conversationParticipants.find(
            (p) => p.userId !== currentUserId
        )?.user;

        if (!participantUser) {
            throw new GraphQLError('Participant not found', {
                extensions: { code: 'PARTICIPANT_NOT_FOUND' },
            });
        }

        const participant = {
            ...participantUser,
            isOnline: onlineUsers.has(participantUser.id),
        };

        const currentParticipant = fullConversation.conversationParticipants.find(
            (p) => p.userId === currentUserId
        );

        const lastReadAt = currentParticipant?.lastReadAt ?? new Date(0);

        const unreadCount = await this.prismaService.message.count({
            where: {
                conversationId: fullConversation.id,
                senderId: { not: currentUserId },
                createdAt: { gt: lastReadAt },
            },
        });

        return {
            __typename: 'ConversationListItemModel',
            id: fullConversation.id,
            participant,
            lastMessage: fullConversation.messages[0] ?? null,
            unreadCount,
            updatedAt: fullConversation.updatedAt,
        };
    }

    async sendMessage(
        conversationId: string,
        senderId: string,
        content: string,
    ) {

        const isParticipant = await this.prismaService.conversationParticipant.findUnique({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId: senderId,
                },

            },
        })

        if (!isParticipant) {
            throw new GraphQLError("You are not a participant of this conversation", {
                extensions: { code: "FORBIDDEN" },
            })
        }

        await this.prismaService.conversationParticipant.updateMany({
            where: {
                conversationId,
                deletedAt: { not: null },
            },
            data: {
                deletedAt: null,
            },
        })

        const participants = await this.prismaService.conversationParticipant.findMany({
            where: { conversationId },
            select: { userId: true },
        })

        const receiverIds = participants
            .map(p => p.userId)
            .filter(id => id !== senderId)


        if (receiverIds.length > 0) {
            const isBlocked = await this.prismaService.userBlock.findFirst({
                where: {
                    OR: receiverIds.map(receiverId => ({
                        blockerId: receiverId,
                        blockedId: senderId,
                    })),
                },
            });

            if (isBlocked) {
                throw new GraphQLError('You cannot send messages to this user', {
                    extensions: { code: 'CHAT_BLOCKED' }
                });
            }
        }

        const message = await this.prismaService.message.create({
            data: {
                conversationId,
                senderId,
                content,

            },
            include: {
                sender: { select: { id: true, username: true, avatar: true, avatarType: true } },
            },
        });

        const conversation = await this.prismaService.conversation.findUnique({
            where: { id: conversationId },
            include: {
                conversationParticipants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                avatarType: true,
                            },
                        },
                    },

                },

            },
        });

        for (const p of conversation?.conversationParticipants!) {

            const unreadCount = await this.prismaService.message.count({
                where: {
                    conversationId,
                    senderId: { not: p.userId },
                    createdAt: {
                        gt: p.lastReadAt ?? new Date(0),
                    },
                },
            });

            const otherUser = conversation?.conversationParticipants.find(
                x => x.userId !== p.userId
            )?.user;

            const participant = otherUser
                ? {
                    __typename: 'UserModel',
                    id: otherUser.id,
                    username: otherUser.username,
                    avatar: otherUser.avatar,
                    avatarType: otherUser.avatarType,
                    isOnline: await this.presenceService.isOnline(otherUser.id),
                }
                : null;

            this.pubSub.publish(`conversation.updated.${p.userId}`, {
                chatChange: {
                    type: 'CREATE',
                    conversationId,
                    lastMessage: message,
                    participant,
                    unreadCount
                }
            });
        }

        this.pubSub.publish('message.change', {
            messageChange: {
                type: 'CREATE',
                ...message,
            }
        });

        return message
    }

    async getMessages(
        conversationId: string,
        currentUserId: string,
        pagination: ItemPaginationInput = {}
    ) {
        const { take = 20, skip = 0 } = pagination

        const conversation = await this.prismaService.conversation.findFirst({
            where: {
                id: conversationId,
                OR: [{ userAId: currentUserId }, { userBId: currentUserId }],
            },
        })

        if (!conversation) {
            throw new GraphQLError("Conversation not found", {
                extensions: { code: "CONVERSATION_NOT_FOUND" },
            })
        }

        const [messages, totalCount] = await this.prismaService.$transaction([
            this.prismaService.message.findMany({
                where: { conversationId },
                orderBy: { createdAt: "desc" },
                take,
                skip,
                include: {
                    sender: { select: { id: true, username: true, avatar: true, avatarType: true } },
                },
            }),
            this.prismaService.message.count({
                where: { conversationId },
            }),
        ]);

        return {
            messages,
            totalCount
        }
    }

    async getUnreadCount(conversationId: string, userId: string) {
        const participant = await this.prismaService.conversationParticipant.findUnique({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
        });

        if (!participant) return 0

        return this.prismaService.message.count({
            where: {
                conversationId,
                senderId: { not: userId },
                createdAt: {
                    gt: participant?.lastReadAt ?? new Date(0),
                },
            },
        });
    }

    async markConversationAsRead(conversationId: string, userId: string) {
        const participant = await this.prismaService.conversationParticipant.findUnique({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
        });

        if (!participant) {
            throw new GraphQLError("Conversation not found", {
                extensions: { code: "CONVERSATION_NOT_FOUND" },
            });
        }

        await this.prismaService.conversationParticipant.update({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
            data: {
                lastReadAt: new Date(),
            },
        });

        return true;
    }

    async getConversations(currentUserId: string) {

        const onlineUsers = await this.presenceService.getOnlineUsers();

        const blocks = await this.prismaService.userBlock.findMany({
            where: {
                OR: [
                    { blockerId: currentUserId }
                ],
            },
        });

        const blockedUserIds = new Set<string>();

        for (const block of blocks) {
            const isMeBlocker = block.blockerId === currentUserId;

            const blockedUserId = isMeBlocker
                ? block.blockedId
                : block.blockerId;

            blockedUserIds.add(blockedUserId);
        }

        const conversations = await this.prismaService.conversation.findMany({
            where: {
                conversationParticipants: {
                    some: {
                        userId: currentUserId,
                        deletedAt: null
                    },
                },
            },
            include: {
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                avatarType: true
                            },
                        },
                    },
                },
                conversationParticipants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                avatarType: true,
                            },
                        },
                    },
                },
            },
        });
        return Promise.all(

            conversations.map(async (conversation) => {
                const participantUser = conversation.conversationParticipants.find(
                    (p) => p.userId !== currentUserId,
                )?.user


                if (!participantUser) return null;
                if (blockedUserIds.has(participantUser.id)) return null;

                const participant = participantUser
                    ? {
                        ...participantUser,
                        isOnline: onlineUsers.has(participantUser.id),
                    }
                    : null;

                const lastReadAt =
                    conversation.conversationParticipants.find(
                        (p) => p.userId === currentUserId,
                    )?.lastReadAt ?? new Date(0);

                const unreadCount = await this.prismaService.message.count({
                    where: {
                        conversationId: conversation.id,
                        senderId: { not: currentUserId },
                        createdAt: { gt: lastReadAt },
                    },
                });

                return {
                    id: conversation.id,
                    participant,
                    lastMessage: conversation.messages[0] ?? null,
                    unreadCount,
                    updatedAt: conversation.updatedAt,
                };
            }),
        ).then(res => res.filter(Boolean));
    }

    async editMessage(userId: string, input: EditMessage): Promise<MessageUpdated> {

        const { messageId, newContent } = input;

        const message = await this.prismaService.message.findUnique({
            where: { id: messageId },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        avatarType: true
                    }
                }
            }
        });

        if (!message) {
            throw new GraphQLError('Message not found', {
                extensions: { code: 'MESSAGE_NOT_FOUND' }
            });
        }

        if (message.senderId !== userId) {
            throw new GraphQLError('Cannot edit others messages', {
                extensions: { code: 'EDIT_MESSAGES_ERROR' }
            });
        }

        const updatedMessage = await this.prismaService.message.update({
            where: { id: messageId },
            data: {
                content: newContent,
                updatedAt: new Date()
            },
            include: {
                sender: {
                    select: { id: true, username: true, avatar: true, avatarType: true }
                },
            },
        });

        this.pubSub.publish('message.change', {
            messageChange: {
                type: 'UPDATE',
                ...updatedMessage
            }
        });

        return {
            id: updatedMessage.id,
            content: updatedMessage.content,
            updatedAt: updatedMessage.updatedAt
        };
    }

    async deleteMessage(userId: string, messageId: string): Promise<boolean> {

        const message = await this.prismaService.message.findUnique({ where: { id: messageId } })

        if (!message) {
            throw new GraphQLError('Message not found', {
                extensions: { code: 'MESSAGE_NOT_FOUND' }
            })
        }

        if (message.senderId !== userId) {
            throw new GraphQLError('Cannot delete others messages', {
                extensions: { code: 'DELETE_MESSAGES_ERROR' }
            })
        }

        const deleteMessage = await this.prismaService.message.update({
            where: { id: messageId },
            data: {
                deleted: true,
                content: 'Message deleted.',
                updatedAt: new Date()
            },
            include: {
                sender: {
                    select: { id: true, username: true, avatar: true, avatarType: true }
                },
            }
        })

        await this.pubSub.publish('message.change', {
            messageChange: {
                type: 'DELETE',
                ...deleteMessage
            }
        });

        return true
    }

    async deleteConversation(userId: string, conversationId: string) {

        const conversation = await this.prismaService.conversationParticipant.findFirst(
            {
                where: {
                    conversationId: conversationId
                }
            }
        )

        if (!conversation) {
            throw new GraphQLError('Conversation not found', {
                extensions: { code: 'CONVERSATION_NOT_FOUND' }
            })
        }

        if (conversation.conversationId === userId) {
            throw new GraphQLError('Cannot delete others conversation', {
                extensions: { code: 'DELETE_CONVERSATION_ERROR' }
            })
        }

        await this.prismaService.conversationParticipant.updateMany({
            where: { conversationId, userId },
            data: { deletedAt: new Date() },
        })

        return true
    }

    async blockUser(blockerId: string, blockedId: string): Promise<BlockUser> {
        if (blockerId === blockedId) {
            throw new GraphQLError('Cannot block yourself', {
                extensions: { code: 'BLOCK_USER_ERROR' }
            })
        }

        const block = await this.prismaService.userBlock.upsert({
            where: {
                blockerId_blockedId: {
                    blockerId,
                    blockedId,
                },
            },
            update: {},
            create: {
                blockerId,
                blockedId,
            },
            select: {
                blocked: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatar: true,
                        avatarType: true,
                    },
                },
                createdAt: true
            },

        })

        return {
            id: block.blocked.id,
            username: block.blocked.username,
            displayName: block.blocked.displayName,
            avatar: block.blocked.avatar,
            avatarType: block.blocked.avatarType,
            createdAt: block.createdAt,
        };
    }

    public async unblockUser(blockerId: string, blockedId: string) {

        await this.prismaService.userBlock.delete({
            where: {
                blockerId_blockedId: {
                    blockerId,
                    blockedId,
                },
            }
        })

        return true
    }

    public async getBlockUSer(
        curentUserId: string,
        pagination: BlockUserInput = {},
    ): Promise<BlockUserPagination> {

        const take = pagination.take ?? 12
        const skip = pagination.skip ?? 0

        const [items, total] = await this.prismaService.$transaction([
            this.prismaService.userBlock.findMany({
                where: { blockerId: curentUserId },
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                select: {
                    blocked: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                            avatarType: true,
                        },
                    },
                    createdAt: true
                },
            }),
            this.prismaService.userBlock.count({
                where: { blockerId: curentUserId },
            }),
        ])

        return {
            items: items.map(b => ({
                id: b.blocked.id,
                username: b.blocked.username,
                displayName: b.blocked.displayName,
                avatar: b.blocked.avatar,
                avatarType: b.blocked.avatarType,
                createdAt: b.createdAt,
            })),
            total,
            take,
            skip,
        }
    }

}
