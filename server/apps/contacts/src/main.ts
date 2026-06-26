import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { configureHttpApp } from '../../../libs/common/src/http';
import { ContactsModule } from './contacts.module';

async function bootstrap() {
  const app = await NestFactory.create(ContactsModule);
  configureHttpApp(app);
  await app.listen(process.env.CONTACTS_PORT ?? 3002);
  console.log(
    `Contacts service running on port ${process.env.CONTACTS_PORT ?? 3002}`,
  );
}

bootstrap();
