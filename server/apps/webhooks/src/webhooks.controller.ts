import { Controller, Get } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  getHello(): string {
    return this.webhooksService.getHello();
  }
}
