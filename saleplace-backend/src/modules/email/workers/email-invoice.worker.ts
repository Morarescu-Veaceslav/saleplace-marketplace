import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { MailService } from "src/modules/libs/mail/mail.service";
import { Worker, Queue, Job } from 'bullmq';

@Injectable()
export class InvoiceEmailWorker implements OnModuleInit, OnApplicationShutdown {
    private worker: Worker;
    constructor(
        @Inject('EMAIL_QUEUE_INVOICE') private readonly queue: Queue,
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
    ) { }
    onModuleInit() {
        this.worker = new Worker(
            'invoice-emails',
            async (job: Job<{ invoiceId: string }>) => {
                const { invoiceId } = job.data;
                
                const invoice = await this.prismaService.invoice.findUnique({
                    where: { id: invoiceId },
                    select: {
                        id: true,
                        stripeInvoiceId: true,
                        amountPaid: true,
                        currency: true,
                        invoicePdf: true,
                        invoiceUrl: true,
                        periodStart: true,
                        periodEnd: true,
                        createdAt: true,
                        subscription: {
                            select: {
                                plan: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                });


                if (!invoice || !invoice.user?.email) return;

                await this.mailService.sendInvoice({
                    to: invoice.user.email,
                    invoiceId: invoice.stripeInvoiceId,
                    planName: invoice.subscription?.plan?.name ?? 'Subscription',
                    amount: invoice.amountPaid,
                    currency: invoice.currency,
                    periodStart: invoice.periodStart,
                    periodEnd: invoice.periodEnd,
                    invoiceUrl: invoice.invoiceUrl!,
                    invoicePdf: invoice.invoicePdf!,
                    issuedAt: invoice.createdAt,
                });

            },
            { connection: this.queue.opts.connection },
        )
    }
    async onApplicationShutdown() {
        await this.worker?.close();
    }
}