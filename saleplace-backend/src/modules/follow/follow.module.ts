import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { EventbusModule } from 'src/core/eventbus/eventbus.module';

@Module({
  imports: [EventbusModule],
  providers: [FollowResolver, FollowService],
  exports: [FollowService]
})
export class FollowModule { }
