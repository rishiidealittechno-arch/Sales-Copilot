import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { getDatabaseConfig } from './database.config';
import { crmModels } from './models';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...getDatabaseConfig(),
      models: crmModels,
    }),
    SequelizeModule.forFeature(crmModels),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
