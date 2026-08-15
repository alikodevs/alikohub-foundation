const db = require('../models');

async function dropLegacyTeamTable() {
  try {
    await db.sequelize.getQueryInterface().dropTable('team_members');
    console.log('Dropped legacy team_members table');
  } catch (err) {
    // Table may already be gone.
  }
}

const connectDB = async () => {
  const dialect = db.sequelize.getDialect();
  const label = dialect === 'mysql' ? 'MySQL' : dialect === 'postgres' ? 'PostgreSQL' : dialect;

  try {
    await db.sequelize.authenticate();
    console.log(`${label} Connected!`);

    // Plain sync creates missing tables. Avoid { alter: true } — can break on unique indexes.
    await db.sequelize.sync();
    await dropLegacyTeamTable();
    console.log('All tables synced!');
  } catch (err) {
    console.error(`${label} connection failed:`, err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
