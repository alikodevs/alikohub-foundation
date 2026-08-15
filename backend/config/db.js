const fs = require('fs');
const path = require('path');
const db = require('../models');

function ensureTeamUploadsExist() {
  try {
    const uploadsTeamDir = path.join(__dirname, '..', 'uploads', 'team');
    if (!fs.existsSync(uploadsTeamDir)) {
      fs.mkdirSync(uploadsTeamDir, { recursive: true });
    }
    const seedAssetsTeam = path.join(__dirname, '..', 'seed_assets', 'team');
    if (fs.existsSync(seedAssetsTeam)) {
      const files = fs.readdirSync(seedAssetsTeam);
      for (const file of files) {
        const srcFile = path.join(seedAssetsTeam, file);
        const destFile = path.join(uploadsTeamDir, file);
        if (!fs.existsSync(destFile) && fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
  } catch (err) {
    console.error('Ensure team uploads error:', err.message);
  }
}

async function dropLegacyTeamTable() {
  try {
    await db.sequelize.getQueryInterface().dropTable('team_members');
    console.log('Dropped legacy team_members table');
  } catch (err) {
    // Table may already be gone.
  }
}

async function autoSeedDefaults() {
  try {
    ensureTeamUploadsExist();
    const boardCount = await db.Board.count();
    if (boardCount === 0) {
      await db.Board.bulkCreate([
        {
          name: 'Boni Aliko',
          role: 'Chairman and Director',
          bio: 'Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.',
          imageUrl: '/uploads/team/boni-aliko.png',
          displayOrder: 1,
          isActive: true,
        },
        {
          name: 'Eyouel Berhe, MBA',
          role: 'Treasurer; Board Member',
          bio: "Oversees financial stewardship, reserves policy, and donor accountability, ensuring every dollar advances the Foundation's mission.",
          imageUrl: '/uploads/team/eyouel-berhe.jpg',
          displayOrder: 2,
          isActive: true,
        },
        {
          name: 'Hanna Tesfaye',
          role: 'Secretary',
          bio: 'Leads governance, board coordination, and safeguarding oversight, keeping the Foundation accountable to its communities and partners.',
          imageUrl: '/uploads/team/hanna-tesfaye.jpg',
          displayOrder: 3,
          isActive: true,
        },
      ]);
      console.log('Auto-seeded initial Board members.');
    }

    const staffCount = await db.Staff.count();
    if (staffCount === 0) {
      await db.Staff.bulkCreate([
        {
          name: 'Boni Aliko',
          role: 'Founder & Chief Executive Officer',
          bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across the seven priority areas.",
          imageUrl: '/uploads/team/boni-aliko.png',
          displayOrder: 1,
          isActive: true,
        },
        {
          name: 'Bonsa Aliko',
          role: 'Chief Operating Officer',
          bio: 'Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution on the ground.',
          imageUrl: '/uploads/team/bonsa-birassa.jpg',
          displayOrder: 2,
          isActive: true,
        },
        {
          name: 'Abdi Aliko',
          role: 'Chief Technology Officer',
          bio: 'Leads technology, digital inclusion infrastructure, and the data systems that power monitoring, learning, and reporting.',
          imageUrl: '/uploads/team/abdi-birassa.png',
          displayOrder: 3,
          isActive: true,
        },
        {
          name: 'Biniyam Birassa',
          role: 'Program Director',
          bio: 'Oversees program quality across education, workforce, and enterprise tracks, from curriculum design to outcome measurement.',
          imageUrl: '/uploads/team/biniyam-birassa.png',
          displayOrder: 4,
          isActive: true,
        },
        {
          name: 'Lensa Aliko',
          role: 'Director of Health Programs',
          bio: 'Directs public and digital health work, including health workforce pipelines, mobile health, and WASH-linked initiatives.',
          imageUrl: '/uploads/team/lensa-aliko.png',
          displayOrder: 5,
          isActive: true,
        },
        {
          name: 'Baatii Aliko',
          role: 'Director of Strategic Partnership & Development',
          bio: 'Builds institutional partnerships, funding relationships, and the collaborations that extend program reach.',
          imageUrl: '/uploads/team/baati-aliko.png',
          displayOrder: 6,
          isActive: true,
        },
        {
          name: 'Hanna Tesfaye',
          role: 'Marketing Manager & Executive Assistant',
          bio: "Leads communications, brand stewardship, and executive coordination across the Foundation's teams and partners.",
          imageUrl: '/uploads/team/hanna-tesfaye.jpg',
          displayOrder: 7,
          isActive: true,
        },
      ]);
      console.log('Auto-seeded initial Staff members.');
    }
  } catch (err) {
    console.error('Auto-seed check error:', err.message);
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
    await autoSeedDefaults();
    console.log('All tables synced!');
  } catch (err) {
    console.error(`${label} connection failed:`, err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
