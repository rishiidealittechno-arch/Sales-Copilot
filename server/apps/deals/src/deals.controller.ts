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
import { CrmDeal, CrmOpportunity } from '../../../libs/database/src';

@Controller('deals')
@UseGuards(AuthGuard)
export class DealsController {
  constructor(
    @InjectModel(CrmDeal)
    private readonly dealModel: typeof CrmDeal,
    @InjectModel(CrmOpportunity)
    private readonly opportunityModel: typeof CrmOpportunity,
  ) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.dealModel.findAll({
      where: { workspaceId },
      order: [['createdAt', 'DESC']],
    });
  }

  @Get(':id')
  async findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const deal = await this.dealModel.findOne({
      where: { id, workspaceId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return deal;
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body()
    body: {
      opportunityId: string;
      name: string;
      value?: string;
      status?: string;
    },
  ) {
    const opportunity = await this.opportunityModel.findOne({
      where: { id: body.opportunityId, workspaceId },
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found in this workspace');
    }

    return this.dealModel.create({
      workspaceId,
      opportunityId: body.opportunityId,
      name: body.name,
      value: body.value ?? null,
      status: body.status ?? null,
    });
  }

  @Patch(':id')
  async update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body()
    body: {
      opportunityId?: string;
      name?: string;
      value?: string;
      status?: string;
    },
  ) {
    const deal = await this.dealModel.findOne({
      where: { id, workspaceId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    if (body.opportunityId) {
      const opportunity = await this.opportunityModel.findOne({
        where: { id: body.opportunityId, workspaceId },
      });

      if (!opportunity) {
        throw new NotFoundException('Opportunity not found in this workspace');
      }
    }

    return deal.update(body);
  }

  @Delete(':id')
  async remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const deal = await this.dealModel.findOne({
      where: { id, workspaceId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    await deal.destroy();
    return { id };
  }
}
