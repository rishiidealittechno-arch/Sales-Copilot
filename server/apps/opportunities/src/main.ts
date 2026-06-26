import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { configureHttpApp } from '../../../libs/common/src/http';
import { OpportunitiesModule } from './opportunities.module';

async function bootstrap() {
  const app = await NestFactory.create(OpportunitiesModule);
  configureHttpApp(app);
  await app.listen(process.env.OPPORTUNITIES_PORT ?? 3003);
  console.log(
    `Opportunities service running on port ${process.env.OPPORTUNITIES_PORT ?? 3003}`,
  );
}

bootstrap();
