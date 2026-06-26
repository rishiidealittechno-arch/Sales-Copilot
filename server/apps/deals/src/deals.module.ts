import { Module } from '@nestjs/common';

import { AuthLibModule } from '../../../libs/auth/src';
import { DatabaseModule } from '../../../libs/database/src';
import { DealsController } from './deals.controller';

@Module({
  imports: [DatabaseModule, AuthLibModule],
  controllers: [DealsController],
})
export class DealsModule {}
