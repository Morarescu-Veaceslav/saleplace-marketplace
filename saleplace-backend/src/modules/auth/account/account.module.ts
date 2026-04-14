import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { VerificationModule } from '../verification/verification.module';
import { ProductModule } from 'src/modules/product/product.module';
import { ProfileModule } from '../profile/profile.module';
import { PresenceModule } from 'src/modules/chat/presence.module';


@Module({
  imports: [VerificationModule, ProductModule, ProfileModule, PresenceModule],
  providers: [AccountResolver, AccountService],
})
export class AccountModule { }
