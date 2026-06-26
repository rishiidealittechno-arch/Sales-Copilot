export function getDatabaseConfig() {
  const databaseUrl =
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/leads-ai';

  const url = new URL(databaseUrl);

  return {
    dialect: 'postgres' as const,
    host: url.hostname,
    port: Number(url.port || 5432),
    username: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    autoLoadModels: true,
    synchronize: false,
    logging: process.env.SEQUELIZE_LOGGING === 'true',
  };
}
