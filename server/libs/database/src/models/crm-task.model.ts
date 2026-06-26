import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { CrmOpportunity } from './crm-opportunity.model';

@Table({ tableName: 'crm_tasks', underscored: true })
export class CrmTask extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'workspace_id' })
  declare workspaceId: string;

  @ForeignKey(() => CrmOpportunity)
  @Column({ type: DataType.UUID, allowNull: true, field: 'opportunity_id' })
  declare opportunityId: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: true, field: 'due_date' })
  declare dueDate: Date | null;

  @BelongsTo(() => CrmOpportunity)
  declare opportunity?: CrmOpportunity;
}
