import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ActorModel } from './actor.model';
import { GqlNotificationType } from '../enums/notification-type.enum';
//import { NotificationType } from '@prisma/generated';

@ObjectType()
export class NotificationModel {
  @Field(() => ID)
  id: string;

  @Field(() => GqlNotificationType)
  type: GqlNotificationType

  @Field()
  isRead: boolean;

  @Field(() => String, { nullable: true })
  url?: string

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ActorModel, { nullable: true })
  actor: ActorModel;

  @Field(() => ID, { nullable: true })
  entityId: string;
}
