import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { configureHttpApp } from '../../../libs/common/src/http';
import { AccountsModule } from './accounts.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountsModule);
  configureHttpApp(app);
  await app.listen(process.env.ACCOUNTS_PORT ?? 3001);
  console.log(
    `Accounts service running on port ${process.env.ACCOUNTS_PORT ?? 3001}`,
  );
}

bootstrap();
