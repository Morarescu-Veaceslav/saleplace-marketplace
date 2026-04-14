import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountDeletionQueue } from 'src/modules/email/queues/account-deletion.queue';

@Injectable()
export class AccountDeletionService {
    private readonly logger = new Logger(AccountDeletionService.name);
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly accountDeletionQueue: AccountDeletionQueue

    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    public async enqueueDeactivatedUsers() {

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const users = await this.prismaService.user.findMany({
            where: {
                isDeactivated: true,
                deactivatedAt: { lte: sevenDaysAgo },
            },
            select: { id: true },
        });

        for (const user of users) {
            await this.accountDeletionQueue.addUserToQueue(user.id);
        }

        this.logger.log(`${users.length} users added to deletion queue`);
    }
}
