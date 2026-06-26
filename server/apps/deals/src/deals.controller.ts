import { Controller, Get } from '@nestjs/common';
import { DealsService } from './deals.service';

@Controller()
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  getHello(): string {
    return this.dealsService.getHello();
  }
}
