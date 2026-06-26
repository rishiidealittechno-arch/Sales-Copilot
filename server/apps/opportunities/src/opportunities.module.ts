import { Module } from '@nestjs/common';

import { AuthLibModule } from '../../../libs/auth/src';
import { DatabaseModule } from '../../../libs/database/src';
import { OpportunitiesController } from './opportunities.controller';

@Module({
  imports: [DatabaseModule, AuthLibModule],
  controllers: [OpportunitiesController],
})
export class OpportunitiesModule {}
