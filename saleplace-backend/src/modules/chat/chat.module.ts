import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { PresenceService } from './presence.service';

@Module({
  providers: [ChatResolver, ChatService, PresenceService],
})
export class ChatModule {}
