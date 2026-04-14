import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { VerificationModule } from '../verification/verification.module';
import { PresenceModule } from 'src/modules/chat/presence.module';

@Module({
  imports: [VerificationModule, PresenceModule],
  providers: [SessionResolver, SessionService],
  exports:[SessionService]

})
export class SessionModule { }
