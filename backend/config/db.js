const db = require('../models');

const connectDB = async () => {
  const dialect = db.sequelize.getDialect();
  const label = dialect === 'mysql' ? 'MySQL' : dialect === 'postgres' ? 'PostgreSQL' : dialect;

  try {
    await db.sequelize.authenticate();
    console.log(`${label} Connected!`);

    // Plain sync creates missing tables. Avoid { alter: true } — can break on unique indexes.
    await db.sequelize.sync();
    console.log('All tables synced!');
  } catch (err) {
    console.error(`${label} connection failed:`, err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
