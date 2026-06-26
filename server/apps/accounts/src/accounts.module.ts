import { Module } from '@nestjs/common';

import { AuthLibModule } from '../../../libs/auth/src';
import { DatabaseModule } from '../../../libs/database/src';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [DatabaseModule, AuthLibModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
