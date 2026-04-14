import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { MailService } from "src/modules/libs/mail/mail.service";
import { Worker, Queue } from 'bullmq';

@Injectable()
export class RefundEmailWorker implements OnModuleInit, OnApplicationShutdown {
    private worker: Worker;
    constructor(
        @Inject('EMAIL_QUEUE_REFUND') private readonly queue: Queue,
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
    ) { }
    onModuleInit() {
        this.worker = new Worker(
            'refund-emails',
            async job => {
                const { orderId } = job.data;

                const order = await this.prismaService.order.findUnique({
                    where: { id: orderId },
                    include: { buyer: true, product: true, transaction: true },
                });

                if (!order) return;

                const refundId = order.transaction?.stripeRefundId;

                if (order.status !== 'REFUNDED' || !refundId) return;

                await this.mailService.sendRefundReceipt({
                    to: order.buyer.email,
                    orderId: order.id,
                    productName: order.product.title,
                    price: order.price.toString(),
                    currency: order.currency,
                    refundId
                });
            },
            { connection: this.queue.opts.connection },
        )
    }

    async onApplicationShutdown() {
        await this.worker?.close();
    }
}