import { NestFactory } from '@nestjs/core';
import { WebhooksModule } from './webhooks.module';

async function bootstrap() {
  const app = await NestFactory.create(WebhooksModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
