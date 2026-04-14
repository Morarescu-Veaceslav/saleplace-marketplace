// presence.module.ts
import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PUB_SUB } from 'src/core/pubsub/pubsub.constants';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    PresenceService,
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PresenceService],
})
export class PresenceModule {}