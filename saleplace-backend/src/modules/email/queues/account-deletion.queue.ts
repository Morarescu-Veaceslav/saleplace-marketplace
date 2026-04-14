import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AccountDeletionQueue {
    private readonly logger = new Logger(AccountDeletionQueue.name);
    constructor(
        @Inject('EMAIL_QUEUE_ACCOUNT_DELETION') private readonly queue: Queue
    ) { }
    async addUserToQueue(userId: string) {
        await this.queue.add('delete-user', { userId }, //delete-user este numele job-ului
            {
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 5
            }
        );
        this.logger.log(`User ${userId} added to deletion queue`);
    }
}
