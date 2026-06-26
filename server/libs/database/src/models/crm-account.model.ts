import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { CrmContact } from './crm-contact.model';
import { CrmOpportunity } from './crm-opportunity.model';

@Table({ tableName: 'crm_accounts', underscored: true })
export class CrmAccount extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'workspace_id' })
  declare workspaceId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare website: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare industry: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @HasMany(() => CrmContact)
  declare contacts?: CrmContact[];

  @HasMany(() => CrmOpportunity)
  declare opportunities?: CrmOpportunity[];
}
