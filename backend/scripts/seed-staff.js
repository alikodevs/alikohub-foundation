'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Staff } = db;

const samples = [
  {
    name: 'Boni Aliko',
    role: 'Founder & Chief Executive Officer',
    bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across the seven priority areas.",
    imageUrl: '/uploads/team/boni-aliko.png',
    displayOrder: 1,
  },
  {
    name: 'Bonsa Aliko',
    role: 'Chief Operating Officer',
    bio: 'Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution on the ground.',
    imageUrl: '/uploads/team/bonsa-birassa.jpg',
    displayOrder: 2,
  },
  {
    name: 'Abdi Aliko',
    role: 'Chief Technology Officer',
    bio: 'Leads technology, digital inclusion infrastructure, and the data systems that power monitoring, learning, and reporting.',
    imageUrl: '/uploads/team/abdi-birassa.png',
    displayOrder: 3,
  },
  {
    name: 'Biniyam Birassa',
    role: 'Program Director',
    bio: 'Oversees program quality across education, workforce, and enterprise tracks, from curriculum design to outcome measurement.',
    imageUrl: '/uploads/team/biniyam-birassa.png',
    displayOrder: 4,
  },
  {
    name: 'Lensa Aliko',
    role: 'Director of Health Programs',
    bio: 'Directs public and digital health work, including health workforce pipelines, mobile health, and WASH-linked initiatives.',
    imageUrl: '/uploads/team/lensa-aliko.png',
    displayOrder: 5,
  },
  {
    name: 'Baatii Aliko',
    role: 'Director of Strategic Partnership & Development',
    bio: 'Builds institutional partnerships, funding relationships, and the collaborations that extend program reach.',
    imageUrl: '/uploads/team/baati-aliko.png',
    displayOrder: 6,
  },
  {
    name: 'Hanna Tesfaye',
    role: 'Marketing Manager & Executive Assistant',
    bio: "Leads communications, brand stewardship, and executive coordination across the Foundation's teams and partners.",
    imageUrl: '/uploads/team/hanna-tesfaye.jpg',
    displayOrder: 7,
  },
];

async function run() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let created = 0;
    let updated = 0;

    for (const item of samples) {
      const existing = await Staff.findOne({
        where: { name: item.name, role: item.role },
      });
      if (existing) {
        await existing.update({
          bio: item.bio,
          imageUrl: item.imageUrl,
          displayOrder: item.displayOrder,
          isActive: true,
        });
        updated += 1;
        continue;
      }
      await Staff.create({ ...item, isActive: true });
      created += 1;
    }

    console.log(`Staff seed done. created=${created}, updated=${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('Staff seed failed:', err.message);
    process.exit(1);
  }
}

run();
