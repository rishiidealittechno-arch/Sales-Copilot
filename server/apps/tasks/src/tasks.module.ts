import { Module } from '@nestjs/common';

import { AuthLibModule } from '../../../libs/auth/src';
import { DatabaseModule } from '../../../libs/database/src';
import { TasksController } from './tasks.controller';

@Module({
  imports: [DatabaseModule, AuthLibModule],
  controllers: [TasksController],
})
export class TasksModule {}
