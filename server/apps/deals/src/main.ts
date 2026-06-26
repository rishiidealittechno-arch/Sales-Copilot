import { NestFactory } from '@nestjs/core';
import { DealsModule } from './deals.module';

async function bootstrap() {
  const app = await NestFactory.create(DealsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
