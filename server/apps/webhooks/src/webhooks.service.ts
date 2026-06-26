import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  getHello(): string {
    return 'Hello World!';
  }
}
