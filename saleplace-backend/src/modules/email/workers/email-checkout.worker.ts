import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { MailService } from "src/modules/libs/mail/mail.service";
import { Worker, Queue } from 'bullmq';

@Injectable()
export class CheckoutEmailWorker implements OnModuleInit, OnApplicationShutdown {
  private worker: Worker;
  constructor(
    @Inject('EMAIL_QUEUE_CHECKOUT') private readonly queue: Queue,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) { }
  onModuleInit() {
    this.worker = new Worker(
      'checkout-emails',
      async job => {
        const { orderId } = job.data;

        const order = await this.prismaService.order.findUnique({
          where: { id: orderId },
          include: { buyer: true, product: true, transaction: true },
        });

        if (!order || order.status !== 'PAID') return;

        await this.mailService.sendCheckout({
          to: order.buyer.email,
          orderId: order.id,
          productName: order.product.title,
          price: order.price.toString(),
          currency: order.currency,
          transactionId: order.transaction?.id ?? '',
        });
      },
      { connection: this.queue.opts.connection },
    );
  }

  async onApplicationShutdown() {
    await this.worker?.close();
  }
}
