import { Controller, Get } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getHello(): string {
    return this.leadsService.getHello();
  }
}
