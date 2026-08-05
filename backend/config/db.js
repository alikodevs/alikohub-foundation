const db = require('../models');

const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('MySQL Connected!');

    // Heal older activity rows / FK quirks before alter sync
    try {
      await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await db.sequelize.query(`
        UPDATE crm_activities
        SET occurred_at = NOW()
        WHERE occurred_at IS NULL
           OR occurred_at = '0000-00-00 00:00:00'
      `).catch(() => {});
      await db.sequelize.query(`
        ALTER TABLE crm_activities
        MODIFY contact_id VARCHAR(36) NULL
      `).catch(() => {});
      await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (_) {
      // table may not exist yet on first boot
    }

    const isProd = process.env.NODE_ENV === 'production';
    await db.sequelize.sync(isProd ? {} : { alter: true });
    console.log('All tables synced!');
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
