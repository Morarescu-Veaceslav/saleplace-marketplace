import { ObjectType, Field, Int } from '@nestjs/graphql';
import { NotificationModel } from "./notification.model"

@ObjectType()
export class NotificationsListResponse {
  @Field(() => [NotificationModel])
  items: NotificationModel[]

  @Field(() => Int)
  total: number
}