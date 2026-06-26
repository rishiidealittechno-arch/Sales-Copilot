import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { CrmOpportunity } from './crm-opportunity.model';

@Table({ tableName: 'crm_deals', underscored: true })
export class CrmDeal extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'workspace_id' })
  declare workspaceId: string;

  @ForeignKey(() => CrmOpportunity)
  @Column({ type: DataType.UUID, allowNull: false, field: 'opportunity_id' })
  declare opportunityId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  declare value: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare status: string | null;

  @BelongsTo(() => CrmOpportunity)
  declare opportunity?: CrmOpportunity;
}
