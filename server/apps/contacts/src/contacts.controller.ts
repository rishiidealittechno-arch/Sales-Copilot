import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  getHello(): string {
    return this.contactsService.getHello();
  }
}
