const db = require('../models');

const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('PostgreSQL Connected!');

    const isProd = process.env.NODE_ENV === 'production';
    await db.sequelize.sync(isProd ? {} : { alter: true });
    console.log('All tables synced!');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
