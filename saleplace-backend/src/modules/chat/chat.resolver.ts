import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { StartConversationInput } from './inputs/start-conversation.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { MessageModel } from './models/message.model';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'src/core/pubsub/pubsub.constants';
import { PubSub } from 'graphql-subscriptions';
import { ConversationListItemModel } from './models/conversation-list.model';
import { EditMessage } from './inputs/edit-message.input';
import { PresenceService } from './presence.service';
import { ItemPaginationInput } from './inputs/item-pagination';
import { MessagePage } from './models/message-page';
import { MessageUpdated } from './models/message-updated';
import { MessageChangeModel } from './models/message-change.model';
import { BlockUserPagination } from './models/block-user-pagination.model';
import { BlockUserInput } from './inputs/block-user.input';
import { BlockUser } from './models/block-user.model';

@Resolver('Chat')
export class ChatResolver {
  public constructor(
    private readonly chatService: ChatService,
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub,
    private presenceService: PresenceService
  ) { }

  @Authorization()
  @Mutation(() => ConversationListItemModel, { name: 'startConversation' })
  startConversation(
    @Authorized() user: User,
    @Args('data') input: StartConversationInput,
  ) {
    return this.chatService.startConversation(
      user.id,
      input.userId,
    )
  }

  @Authorization()
  @Mutation(() => MessageModel, { name: 'sendMessage' })
  sendMessage(
    @Authorized() user: User,
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
  ) {
    return this.chatService.sendMessage(
      conversationId,
      user.id,
      content,
    )
  }

  @Subscription(() => MessageChangeModel, {
    resolve: (payload) => payload.chatChange
  })
  chatChange(
    @Context() context: any,
  ) {

    const userId = context.req?.user?.id;

    if (!userId) {
      return {
        async *[Symbol.asyncIterator]() { },
      };
    }

    return this.pubSub.asyncIterableIterator(
      `conversation.updated.${userId}`
    );
  }

  @Subscription(() => MessageModel, {
    filter: (payload, variables) =>
      payload.messageChange.conversationId === variables.conversationId,
  })
  messageChange(@Args('conversationId') conversationId: string) {
    return this.pubSub.asyncIterableIterator('message.change');
  }

  @Authorization()
  @Query(() => MessagePage, { name: 'getMessages' })
  getMessages(
    @Authorized() user: User,
    @Args('conversationId') conversationId: string,
    @Args('pagination', { nullable: true })
    pagination?: ItemPaginationInput,
  ) {
    return this.chatService.getMessages(
      conversationId,
      user.id,
      pagination
    )
  }

  @Authorization()
  @Query(() => String, { name: 'getUnreadCount' })
  getUnreadCount(
    @Authorized() user: User,
    @Args('conversationId') conversationId: string,
  ) {
    return this.chatService.getUnreadCount(conversationId, user.id)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'markConversationAsRead' })
  markConversationAsRead(
    @Authorized() user: User,
    @Args('conversationId') conversationId: string,
  ) {
    return this.chatService.markConversationAsRead(conversationId, user.id)
  }

  @Authorization()
  @Query(() => [ConversationListItemModel], { name: 'getConversations' })
  getConversations(
    @Authorized() user: User,
  ) {
    return this.chatService.getConversations(user.id);
  }

  @Authorization()
  @Mutation(() => MessageUpdated, { name: 'editMessage' })
  editMessage(
    @Authorized() user: User,
    @Args('data') data: EditMessage
  ): Promise<MessageUpdated> {
    return this.chatService.editMessage(user.id, data)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteMessage' })
  deleteMessage(
    @Authorized() user: User,
    @Args('messageId') messageId: string
  ): Promise<boolean> {
    return this.chatService.deleteMessage(user.id, messageId)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'deleteConversation' })
  deleteConversation(
    @Authorized() user: User,
    @Args('conversationId') conversationId: string
  ) {
    return this.chatService.deleteConversation(user.id, conversationId)
  }

  @Authorization()
  @Mutation(() => BlockUser, { name: 'blockUser' })
  blockUser(
    @Authorized() user: User,
    @Args('blockedId') blockedId: string
  ) {
    return this.chatService.blockUser(user.id, blockedId)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'unblockUser' })
  async unblockUser(
    @Authorized() user: User,
    @Args('blockedId') blockedId: string
  ) {
    return this.chatService.unblockUser(user.id, blockedId)
  }

  @Query(() => [String])
  async onlineUsers() {
    return Array.from(await this.presenceService.getOnlineUsers());
  }

  @Authorization()
  @Query(() => BlockUserPagination, { name: 'getBlockUser' })
  public async getBlockUser(
    @Authorized() user: User,
    @Args('pagination', { nullable: true })
    pagination?: BlockUserInput,
  ) {
    return this.chatService.getBlockUSer(user.id, pagination)
  }

}
