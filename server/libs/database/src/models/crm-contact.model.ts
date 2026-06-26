import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { CrmAccount } from './crm-account.model';

@Table({ tableName: 'crm_contacts', underscored: true })
export class CrmContact extends Model {
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

  @Column({ type: DataType.STRING, allowNull: true, field: 'first_name' })
  declare firstName: string | null;

  @Column({ type: DataType.STRING, allowNull: true, field: 'last_name' })
  declare lastName: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare email: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare title: string | null;

  @BelongsTo(() => CrmAccount)
  declare account?: CrmAccount;
}
