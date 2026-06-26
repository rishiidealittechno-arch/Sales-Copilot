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
import { CrmOpportunity, CrmTask } from '../../../libs/database/src';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    @InjectModel(CrmTask)
    private readonly taskModel: typeof CrmTask,
    @InjectModel(CrmOpportunity)
    private readonly opportunityModel: typeof CrmOpportunity,
  ) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.taskModel.findAll({
      where: { workspaceId },
      order: [['createdAt', 'DESC']],
    });
  }

  @Get(':id')
  async findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const task = await this.taskModel.findOne({
      where: { id, workspaceId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body()
    body: {
      opportunityId?: string;
      title: string;
      description?: string;
      status?: string;
      dueDate?: string;
    },
  ) {
    if (body.opportunityId) {
      const opportunity = await this.opportunityModel.findOne({
        where: { id: body.opportunityId, workspaceId },
      });

      if (!opportunity) {
        throw new NotFoundException('Opportunity not found in this workspace');
      }
    }

    return this.taskModel.create({
      workspaceId,
      opportunityId: body.opportunityId ?? null,
      title: body.title,
      description: body.description ?? null,
      status: body.status ?? 'pending',
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    });
  }

  @Patch(':id')
  async update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body()
    body: {
      opportunityId?: string | null;
      title?: string;
      description?: string;
      status?: string;
      dueDate?: string | null;
    },
  ) {
    const task = await this.taskModel.findOne({
      where: { id, workspaceId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (body.opportunityId) {
      const opportunity = await this.opportunityModel.findOne({
        where: { id: body.opportunityId, workspaceId },
      });

      if (!opportunity) {
        throw new NotFoundException('Opportunity not found in this workspace');
      }
    }

    return task.update({
      ...body,
      dueDate:
        body.dueDate === undefined
          ? task.dueDate
          : body.dueDate
            ? new Date(body.dueDate)
            : null,
    });
  }

  @Delete(':id')
  async remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    const task = await this.taskModel.findOne({
      where: { id, workspaceId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await task.destroy();
    return { id };
  }
}
