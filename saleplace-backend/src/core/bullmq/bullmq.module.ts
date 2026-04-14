import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createBullMQConnection } from './bullmq.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'BULLMQ_CONNECTION',
      inject: [ConfigService],
      useFactory: createBullMQConnection,
    },
  ],
  exports: ['BULLMQ_CONNECTION'],
})
export class BullMQModule {}
