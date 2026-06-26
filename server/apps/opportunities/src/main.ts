import { NestFactory } from '@nestjs/core';
import { OpportunitiesModule } from './opportunities.module';

async function bootstrap() {
  const app = await NestFactory.create(OpportunitiesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
