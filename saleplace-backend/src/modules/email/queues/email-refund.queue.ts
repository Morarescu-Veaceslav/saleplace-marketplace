import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class RefundEmailQueue {
  constructor(
    @Inject('EMAIL_QUEUE_REFUND')
    private readonly queue: Queue,
  ) {}

  async sendReceiptRefund(orderId: string): Promise<void> {
    await this.queue.add(
      'refund-receipt',
      { orderId },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
      },
    );
  }
}
