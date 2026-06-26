import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
