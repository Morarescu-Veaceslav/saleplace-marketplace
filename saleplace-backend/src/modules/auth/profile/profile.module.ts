import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { StorageModule } from 'src/modules/libs/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService]
})
export class ProfileModule { }
