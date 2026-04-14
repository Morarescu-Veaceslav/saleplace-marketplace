import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { EmailModule } from '../email/email.module';
import { EventbusModule } from 'src/core/eventbus/eventbus.module';

@Module({
  imports: [EmailModule, EventbusModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule { }