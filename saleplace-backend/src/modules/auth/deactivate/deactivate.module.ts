import { Module } from '@nestjs/common';
import { DeactivateService } from './deactivate.service';
import { DeactivateResolver } from './deactivate.resolver';
import { SessionModule } from '../session/session.module';

@Module({
  imports:[SessionModule],
  providers: [DeactivateResolver, DeactivateService],
})
export class DeactivateModule {}
