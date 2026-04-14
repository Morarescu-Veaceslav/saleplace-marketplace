import { Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { StorageService } from '../../libs/storage/storage.service';

@Injectable()
export class AccountDeletionWorker implements OnModuleInit, OnApplicationShutdown {
    private worker: Worker;
    private readonly logger = new Logger(AccountDeletionWorker.name);
    constructor(
        @Inject('EMAIL_QUEUE_ACCOUNT_DELETION') private readonly queue: Queue,
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly storageService: StorageService
    ) { }
    onModuleInit() {
        this.worker = new Worker(
            'account-deletion', //workerul care asculta coada
            async job => {
                const { userId } = job.data;

                const user = await this.prismaService.user.findUnique({ where: { id: userId } });
                if (!user) return;

                await this.mailService.sendAccountDeletion(user.email);

                if (user.avatarType === 'CUSTOM' && user.avatar) {
                    await this.storageService.deleteImage(user.avatar);
                }

                await this.prismaService.user.delete({ where: { id: userId } });

                this.logger.log(`User ${userId} deleted successfully`);
            },
            { connection: this.queue.opts.connection },
        )
    }

    async onApplicationShutdown() {
        await this.worker?.close();
    }
}
