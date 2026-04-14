import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { FollowEventListener } from './events/follow/follow.listener';
import { EventbusModule } from 'src/core/eventbus/eventbus.module';
import { PostEventListener } from './events/post/post.listener';
import { OrderPaidEventListener } from './events/checkout/checkout.listener';
import { OrderRefundedEventListener } from './events/refund/refund.listener';
import { InvoiceEventListener } from './events/invoice/invoice.listener';
import { SubscriptionCanceledListener } from './events/subscriptionCanceled/subscription-canceled.listener';

@Module({
  imports: [EventbusModule],
  providers: [NotificationsResolver,
    NotificationsService,
    FollowEventListener,
    PostEventListener,
    OrderPaidEventListener,
    OrderRefundedEventListener,
    InvoiceEventListener,
    SubscriptionCanceledListener
  ],
  exports: [NotificationsService]
})
export class NotificationsModule { }
