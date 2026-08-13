'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { TeamMember } = db;

async function ensureCategoryColumn() {
  try {
    const qi = db.sequelize.getQueryInterface();
    const table = await qi.describeTable('team_members');
    if (!table.category) {
      await qi.addColumn('team_members', 'category', {
        type: db.Sequelize.ENUM('staff', 'board'),
        allowNull: false,
        defaultValue: 'staff',
      });
      console.log('Added team_members.category column');
    }
  } catch (err) {
    if (!String(err.message).includes("doesn't exist") && !String(err.message).includes('does not exist')) {
      throw err;
    }
  }
}

const samples = [
  // Board of Directors
  {
    category: 'board',
    name: 'Boni Aliko',
    role: 'Chairman and Director',
    bio: "Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.",
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
  },
  {
    category: 'board',
    name: 'Eyouel Berhe, MBA',
    role: 'Treasurer; Board Member',
    bio: "Oversees financial stewardship, reserves policy, and donor accountability, ensuring every dollar advances the Foundation's mission.",
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
  },
  {
    category: 'board',
    name: 'Hanna Tesfaye',
    role: 'Secretary',
    bio: 'Leads governance, board coordination, and safeguarding oversight, keeping the Foundation accountable to its communities and partners.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
  },
  // Staff Members
  {
    category: 'staff',
    name: 'Boni Aliko',
    role: 'Founder & Chief Executive Officer',
    bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across the seven priority areas.",
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
  },
  {
    category: 'staff',
    name: 'Bonsa Aliko',
    role: 'Chief Operating Officer',
    bio: 'Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution on the ground.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
  },
  {
    category: 'staff',
    name: 'Abdi Aliko',
    role: 'Chief Technology Officer',
    bio: 'Leads technology, digital inclusion infrastructure, and the data systems that power monitoring, learning, and reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
  },
  {
    category: 'staff',
    name: 'Biniyam Birassa',
    role: 'Program Director',
    bio: 'Oversees program quality across education, workforce, and enterprise tracks, from curriculum design to outcome measurement.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
  },
  {
    category: 'staff',
    name: 'Lensa Aliko',
    role: 'Director of Health Programs',
    bio: 'Directs public and digital health work, including health workforce pipelines, mobile health, and WASH-linked initiatives.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
  },
  {
    category: 'staff',
    name: 'Baatii Aliko',
    role: 'Director of Strategic Partnership & Development',
    bio: 'Builds institutional partnerships, funding relationships, and the collaborations that extend program reach.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
  },
  {
    category: 'staff',
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
    await ensureCategoryColumn();

    // Remove mistaken standalone images table if it exists
    try {
      await db.sequelize.getQueryInterface().dropTable('images');
      console.log('Dropped unused images table');
    } catch (_) {
      // ignore if missing
    }

    let created = 0;
    let updated = 0;

    for (const item of samples) {
      const existing = await TeamMember.findOne({
        where: { name: item.name, role: item.role, category: item.category },
      });
      if (existing) {
        await existing.update({ imageUrl: item.imageUrl, bio: item.bio });
        updated += 1;
        continue;
      }
      await TeamMember.create({ ...item, isActive: true });
      created += 1;
    }

    console.log(`Team seed done. created=${created}, updated=${updated}`);
    console.log('Team image field: imageUrl (on TeamMember model)');
    process.exit(0);
  } catch (err) {
    console.error('Team seed failed:', err.message);
    process.exit(1);
  }
}

run();
