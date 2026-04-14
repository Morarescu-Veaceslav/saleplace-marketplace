import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class CheckoutEmailQueue {
  // sendInvoice(id: string) {
  //     throw new Error('Method not implemented.');
  // }
  // sendReceiptRefund(orderId: string) {
  //     throw new Error('Method not implemented.');
  // }
  constructor(
    @Inject('EMAIL_QUEUE_CHECKOUT')
    private readonly queue: Queue,
  ) {}

  async sendReceipt(orderId: string) {
    await this.queue.add(
      'send-receipt',
      { orderId },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
      },
    );
  }
}
