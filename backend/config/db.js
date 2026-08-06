const db = require('../models');

const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('PostgreSQL Connected!');

    // Plain sync creates missing tables. Avoid { alter: true } on Postgres —
    // Sequelize can emit invalid UNIQUE ALTER statements and crash startup.
    await db.sequelize.sync();
    console.log('All tables synced!');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
