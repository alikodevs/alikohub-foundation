require('dotenv').config();

const db = require('../models');

const { User, Profile, UserRole } = db;

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@alikohub.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const displayName = process.env.ADMIN_DISPLAY_NAME || 'Admin';

  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        passwordHash: password, // hashed by User beforeCreate hook
        displayName,
      });

      await Profile.create({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      });

      await UserRole.create({ userId: user.id, role: 'user' });
      console.log(`Created admin user: ${email}`);
    } else {
      // Reset password so seed always restores known credentials
      user.passwordHash = password;
      user.displayName = displayName;
      await user.save();
      console.log(`Updated existing user password: ${email}`);
    }

    const adminRole = await UserRole.findOne({
      where: { userId: user.id, role: 'admin' },
    });

    if (!adminRole) {
      await UserRole.create({ userId: user.id, role: 'admin' });
      console.log('Assigned admin role');
    } else {
      console.log('Admin role already present');
    }

    console.log('Admin seed complete');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Admin seed failed:', err.message);
    process.exit(1);
  }
}

seedAdmin();
