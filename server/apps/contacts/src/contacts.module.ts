import { Module } from '@nestjs/common';

import { AuthLibModule } from '../../../libs/auth/src';
import { DatabaseModule } from '../../../libs/database/src';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [DatabaseModule, AuthLibModule],
  controllers: [ContactsController],
})
export class ContactsModule {}
