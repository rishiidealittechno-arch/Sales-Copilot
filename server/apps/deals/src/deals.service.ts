import { Injectable } from '@nestjs/common';

@Injectable()
export class DealsService {
  getHello(): string {
    return 'Hello World!';
  }
}
