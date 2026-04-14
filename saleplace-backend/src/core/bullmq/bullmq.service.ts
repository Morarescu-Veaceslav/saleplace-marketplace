import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'bullmq';


export const createBullMQConnection = (
    config: ConfigService,
): ConnectionOptions => ({
    url: config.getOrThrow<string>('REDIS_URL'),
})
