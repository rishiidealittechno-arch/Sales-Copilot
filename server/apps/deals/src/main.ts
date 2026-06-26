import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { configureHttpApp } from '../../../libs/common/src/http';
import { DealsModule } from './deals.module';

async function bootstrap() {
  const app = await NestFactory.create(DealsModule);
  configureHttpApp(app);
  await app.listen(process.env.DEALS_PORT ?? 3004);
  console.log(`Deals service running on port ${process.env.DEALS_PORT ?? 3004}`);
}

bootstrap();
