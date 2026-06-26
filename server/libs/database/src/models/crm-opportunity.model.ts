import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { CrmAccount } from './crm-account.model';
import { CrmDeal } from './crm-deal.model';
import { CrmTask } from './crm-task.model';

@Table({ tableName: 'crm_opportunities', underscored: true })
export class CrmOpportunity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'workspace_id' })
  declare workspaceId: string;

  @ForeignKey(() => CrmAccount)
  @Column({ type: DataType.UUID, allowNull: false, field: 'account_id' })
  declare accountId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare stage: string | null;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  declare amount: string | null;

  @Column({ type: DataType.DATEONLY, allowNull: true, field: 'close_date' })
  declare closeDate: string | null;

  @BelongsTo(() => CrmAccount)
  declare account?: CrmAccount;

  @HasMany(() => CrmDeal)
  declare deals?: CrmDeal[];

  @HasMany(() => CrmTask)
  declare tasks?: CrmTask[];
}
