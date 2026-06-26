import { NestFactory } from '@nestjs/core';
import { LeadsModule } from './leads.module';

async function bootstrap() {
  const app = await NestFactory.create(LeadsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
