import { registerEnumType } from '@nestjs/graphql';
import { NotificationType as PrismaNotificationType } from '@prisma/generated';

export const NotificationType = PrismaNotificationType

registerEnumType(NotificationType, {
    name: 'NotificationType',
    description: 'Notification type',
});

export type NotificationTypeEnum = PrismaNotificationType;