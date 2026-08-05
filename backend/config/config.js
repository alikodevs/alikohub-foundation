require('dotenv').config();

const useSsl = process.env.DB_SSL === 'true' || process.env.DB_SSL === '1';

const base = {
  logging: false,
  dialect: 'postgres',
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined,
};

function fromEnv(fallbackDb) {
  if (process.env.DATABASE_URL) {
    return {
      ...base,
      use_env_variable: 'DATABASE_URL',
    };
  }

  return {
    ...base,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || fallbackDb,
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
  };
}

module.exports = {
  development: fromEnv('alikohub_foundation'),
  test: fromEnv('alikohub_foundation_test'),
  production: fromEnv('alikohub_foundation'),
};
