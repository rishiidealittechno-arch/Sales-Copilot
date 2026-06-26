import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import {
  AuthGuard,
  WorkspaceId,
} from '../../../libs/auth/src';
import { CrmAccount, CrmContact } from '../../../libs/database/src';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(
    @InjectModel(CrmContact)
    private readonly contactModel: typeof CrmContact,
    @InjectModel(CrmAccount)
    private readonly accountModel: typeof CrmAccount,
  ) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.contactModel.findAll({
      where: { workspaceId },
      order: [['createdAt', 'DESC']],
    });
  }

  @Get(':id')
  async findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const contact = await this.contactModel.findOne({
      where: { id, workspaceId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body()
    body: {
      accountId: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      title?: string;
    },
  ) {
    const account = await this.accountModel.findOne({
      where: { id: body.accountId, workspaceId },
    });

    if (!account) {
      throw new NotFoundException('Account not found in this workspace');
    }

    return this.contactModel.create({
      workspaceId,
      accountId: body.accountId,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
      title: body.title ?? null,
    });
  }

  @Patch(':id')
  async update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body()
    body: {
      accountId?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      title?: string;
    },
  ) {
    const contact = await this.contactModel.findOne({
      where: { id, workspaceId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (body.accountId) {
      const account = await this.accountModel.findOne({
        where: { id: body.accountId, workspaceId },
      });

      if (!account) {
        throw new NotFoundException('Account not found in this workspace');
      }
    }

    return contact.update(body);
  }

  @Delete(':id')
  async remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const contact = await this.contactModel.findOne({
      where: { id, workspaceId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await contact.destroy();
    return { id };
  }
}
