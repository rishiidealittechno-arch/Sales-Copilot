import { Controller, Get } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';

@Controller()
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  getHello(): string {
    return this.opportunitiesService.getHello();
  }
}
