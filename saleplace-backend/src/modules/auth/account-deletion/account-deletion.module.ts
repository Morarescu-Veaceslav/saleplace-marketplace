import { Module } from '@nestjs/common';
import { AccountDeletionService } from './account-deletion.service';
import { StorageModule } from '../../libs/storage/storage.module';
import { EmailModule } from 'src/modules/email/email.module';

@Module({
  imports: [StorageModule, EmailModule],
  providers: [AccountDeletionService],
  exports: [AccountDeletionService]
})
export class AccountDeletionModule { }
