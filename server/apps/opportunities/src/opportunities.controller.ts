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
import { CrmAccount, CrmOpportunity } from '../../../libs/database/src';

@Controller('opportunities')
@UseGuards(AuthGuard)
export class OpportunitiesController {
  constructor(
    @InjectModel(CrmOpportunity)
    private readonly opportunityModel: typeof CrmOpportunity,
    @InjectModel(CrmAccount)
    private readonly accountModel: typeof CrmAccount,
  ) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.opportunityModel.findAll({
      where: { workspaceId },
      order: [['createdAt', 'DESC']],
    });
  }

  @Get(':id')
  async findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const opportunity = await this.opportunityModel.findOne({
      where: { id, workspaceId },
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    return opportunity;
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body()
    body: {
      accountId: string;
      name: string;
      stage?: string;
      amount?: string;
      closeDate?: string;
    },
  ) {
    const account = await this.accountModel.findOne({
      where: { id: body.accountId, workspaceId },
    });

    if (!account) {
      throw new NotFoundException('Account not found in this workspace');
    }

    return this.opportunityModel.create({
      workspaceId,
      accountId: body.accountId,
      name: body.name,
      stage: body.stage ?? null,
      amount: body.amount ?? null,
      closeDate: body.closeDate ?? null,
    });
  }

  @Patch(':id')
  async update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body()
    body: {
      accountId?: string;
      name?: string;
      stage?: string;
      amount?: string;
      closeDate?: string;
    },
  ) {
    const opportunity = await this.opportunityModel.findOne({
      where: { id, workspaceId },
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (body.accountId) {
      const account = await this.accountModel.findOne({
        where: { id: body.accountId, workspaceId },
      });

      if (!account) {
        throw new NotFoundException('Account not found in this workspace');
      }
    }

    return opportunity.update(body);
  }

  @Delete(':id')
  async remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const opportunity = await this.opportunityModel.findOne({
      where: { id, workspaceId },
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    await opportunity.destroy();
    return { id };
  }
}
