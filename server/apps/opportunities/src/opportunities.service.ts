import { Injectable } from '@nestjs/common';

@Injectable()
export class OpportunitiesService {
  getHello(): string {
    return 'Hello World!';
  }
}
