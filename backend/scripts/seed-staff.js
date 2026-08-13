'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Staff } = db;

const samples = [
  {
    name: 'Boni Aliko',
    role: 'Founder & Chief Executive Officer',
    bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across the seven priority areas.",
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
  },
  {
    name: 'Bonsa Aliko',
    role: 'Chief Operating Officer',
    bio: 'Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution on the ground.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
  },
  {
    name: 'Abdi Aliko',
    role: 'Chief Technology Officer',
    bio: 'Leads technology, digital inclusion infrastructure, and the data systems that power monitoring, learning, and reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
  },
  {
    name: 'Biniyam Birassa',
    role: 'Program Director',
    bio: 'Oversees program quality across education, workforce, and enterprise tracks, from curriculum design to outcome measurement.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
  },
  {
    name: 'Lensa Aliko',
    role: 'Director of Health Programs',
    bio: 'Directs public and digital health work, including health workforce pipelines, mobile health, and WASH-linked initiatives.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
  },
  {
    name: 'Baatii Aliko',
    role: 'Director of Strategic Partnership & Development',
    bio: 'Builds institutional partnerships, funding relationships, and the collaborations that extend program reach.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
  },
  {
    name: 'Hanna Tesfaye',
    role: 'Marketing Manager & Executive Assistant',
    bio: "Leads communications, brand stewardship, and executive coordination across the Foundation's teams and partners.",
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
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
