require('dotenv').config();

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);

  return {
    username: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    host: url.hostname,
    port: Number(url.port || 5432),
    dialect: 'postgres',
  };
}

const databaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/leads-ai';

const baseConfig = {
  ...parseDatabaseUrl(databaseUrl),
  logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false,
  migrationStorageTableName: 'sequelize_meta',
};

module.exports = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig,
};
