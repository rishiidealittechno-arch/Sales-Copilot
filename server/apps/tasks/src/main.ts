import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { configureHttpApp } from '../../../libs/common/src/http';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  configureHttpApp(app);
  await app.listen(process.env.TASKS_PORT ?? 3005);
  console.log(`Tasks service running on port ${process.env.TASKS_PORT ?? 3005}`);
}

bootstrap();
