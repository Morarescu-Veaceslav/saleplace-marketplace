import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { NotificationModel } from './models/notification.model';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'src/core/pubsub/pubsub.constants';
import { PubSub } from 'graphql-subscriptions';
import { PaginationInput } from './inputs/pagination.input';
import { NotificationsListResponse } from './models/notificationListResponse.model';

@Resolver('Notification')
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService,
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub,
  ) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'markAllNotificationsAsRead' })
  async markAllNotificationsAsRead(
    @Authorized() user: User,
  ): Promise<boolean> {
    return this.notificationsService.markAllAsRead(user.id)
  }
  @Authorization()
  @Query(() => Int, { name: 'findUnreadNotificationCount' })
  findUnreadNotificationCount(
    @Authorized() user: User): Promise<number> {
    return this.notificationsService.findUnreadNotificationCount(user.id)
  }

  @Subscription(() => NotificationModel, {
    filter: (payload, variables) => {
      return payload.notificationCreated.userId === variables.userId
    },
  })
  notificationCreated(
    @Args('userId') userId: string,
  ) {
    return this.pubSub.asyncIterableIterator('notification.created')
  }

  // @Authorization()
  // @Query(() => [NotificationModel], { name: 'findNotificationsByUser' })
  // public async findByUser(@Authorized() user: User) {
  //   return this.notificationsService.findByUser(user)
  // }

  @Authorization()
  @Query(() => NotificationsListResponse, { name: 'findNotificationsByUser' })
  public async findByUser(
    @Authorized() user: User,
    @Args('pagination', { nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.notificationsService.findByUser(user, pagination)
  }

  @Authorization()
  @Mutation(() => Boolean)
  deleteNotification(
    @Authorized() user: User,
    @Args('notificationId') notificationId: string,
  ) {
    return this.notificationsService.deleteNotification(user.id, notificationId)
  }

}
