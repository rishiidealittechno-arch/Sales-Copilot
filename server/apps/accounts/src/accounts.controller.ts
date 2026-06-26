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
import { CrmAccount } from '../../../libs/database/src';

@Controller('accounts')
@UseGuards(AuthGuard)
export class AccountsController {
  constructor(
    @InjectModel(CrmAccount)
    private readonly accountModel: typeof CrmAccount,
  ) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.accountModel.findAll({
      where: { workspaceId },
      order: [['createdAt', 'DESC']],
    });
  }

  @Get(':id')
  async findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const account = await this.accountModel.findOne({
      where: { id, workspaceId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  @Post()
  create(
    @WorkspaceId() workspaceId: string,
    @Body()
    body: {
      name: string;
      website?: string;
      industry?: string;
      description?: string;
    },
  ) {
    return this.accountModel.create({
      workspaceId,
      name: body.name,
      website: body.website ?? null,
      industry: body.industry ?? null,
      description: body.description ?? null,
    });
  }

  @Patch(':id')
  async update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      website?: string;
      industry?: string;
      description?: string;
    },
  ) {
    const account = await this.accountModel.findOne({
      where: { id, workspaceId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account.update(body);
  }

  @Delete(':id')
  async remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const account = await this.accountModel.findOne({
      where: { id, workspaceId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    await account.destroy();
    return { id };
  }
}
