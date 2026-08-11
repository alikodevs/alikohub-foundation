require('dotenv').config();

const dialect = (process.env.DB_DIALECT || 'mysql').toLowerCase();
const useSsl = process.env.DB_SSL === 'true' || process.env.DB_SSL === '1';

const base = {
  logging: false,
  dialect,
};

if (dialect === 'postgres' && useSsl) {
  base.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

function fromEnv(fallbackDb) {
  // App runtime prefers explicit DB_* for MySQL.
  // DATABASE_URL is only used when dialect is postgres (e.g. Neon source).
  if (dialect === 'postgres' && process.env.DATABASE_URL) {
    return {
      ...base,
      use_env_variable: 'DATABASE_URL',
    };
  }

  const defaultPort = dialect === 'mysql' ? 3306 : 5432;
  const defaultUser = dialect === 'mysql' ? 'root' : 'postgres';

  return {
    ...base,
    username: process.env.DB_USER || defaultUser,
    password: process.env.DB_PASS || process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || fallbackDb,
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || defaultPort,
  };
}

module.exports = {
  development: fromEnv('alikohub_foundation'),
  test: fromEnv('alikohub_foundation_test'),
  production: fromEnv('alikohub_foundation'),
};
