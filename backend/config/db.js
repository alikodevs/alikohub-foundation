const db = require('../models');

async function ensureTeamCategoryColumn() {
  try {
    const qi = db.sequelize.getQueryInterface();
    const table = await qi.describeTable('team_members');
    if (!table.category) {
      await qi.addColumn('team_members', 'category', {
        type: db.Sequelize.ENUM('staff', 'board'),
        allowNull: false,
        defaultValue: 'staff',
      });
      console.log('Added team_members.category (staff | board)');
    }
  } catch (err) {
    // Ignore if table is brand new / not ready; sync already covered creation.
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
    await ensureTeamCategoryColumn();
    console.log('All tables synced!');
  } catch (err) {
    console.error(`${label} connection failed:`, err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
