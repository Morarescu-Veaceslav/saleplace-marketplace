import { Module } from '@nestjs/common';
import { MailService } from '../libs/mail/mail.service';
import { ConnectionOptions, Queue } from 'bullmq';
import { CheckoutEmailWorker } from './workers/email-checkout.worker';
import { CheckoutEmailQueue } from './queues/email-checkout.queue';
import { RefundEmailQueue } from './queues/email-refund.queue';
import { RefundEmailWorker } from './workers/email-refund.worker';
import { AccountDeletionQueue } from './queues/account-deletion.queue';
import { AccountDeletionWorker } from './workers/account-deletion.worker';
import { StorageModule } from '../libs/storage/storage.module';
import { InvoiceEmailQueue } from './queues/email-invoice.queue';
import { BullModule } from '@nestjs/bullmq';
import { InvoiceEmailWorker } from './workers/email-invoice.worker';

@Module({
  imports: [StorageModule,],
  providers: [
    MailService,

    {
      provide: 'EMAIL_QUEUE_CHECKOUT',
      useFactory: (connection: ConnectionOptions) =>
        new Queue('checkout-emails', { connection }),
      inject: ['BULLMQ_CONNECTION'],
    },
    {
      provide: 'EMAIL_QUEUE_REFUND',
      useFactory: (connection: ConnectionOptions) =>
        new Queue('refund-emails', { connection }),
      inject: ['BULLMQ_CONNECTION'],
    },
    {
      provide: 'EMAIL_QUEUE_ACCOUNT_DELETION',
      useFactory: (connection: ConnectionOptions) =>
        new Queue('account-deletion', { connection }), //numele cozii 
      inject: ['BULLMQ_CONNECTION'],
    },
    {
      provide: 'EMAIL_QUEUE_INVOICE',
      useFactory: (connection: ConnectionOptions) =>
        new Queue('invoice-emails', { connection }),
      inject: ['BULLMQ_CONNECTION'],
    },

    CheckoutEmailQueue,
    CheckoutEmailWorker,
    RefundEmailQueue,
    RefundEmailWorker,
    AccountDeletionQueue,
    AccountDeletionWorker,
    InvoiceEmailQueue,
    InvoiceEmailWorker
  ],

  exports: [
    CheckoutEmailQueue,
    RefundEmailQueue,
    AccountDeletionQueue,
    InvoiceEmailQueue
  ],
})
export class EmailModule { }
