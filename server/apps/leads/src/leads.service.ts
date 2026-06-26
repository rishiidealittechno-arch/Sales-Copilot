import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {
  getHello(): string {
    return 'Hello World!';
  }
}
