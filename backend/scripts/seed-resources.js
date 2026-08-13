'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Resource } = db;

const samples = [
  {
    title: 'Program Briefs',
    slug: 'program-briefs',
    category: 'briefs',
    tag: 'Briefs',
    description:
      'Short summaries of each program area: objectives, delivery model, partners, and expected outcomes.',
    accent: 'hsl(var(--trust-blue))',
    displayOrder: 1,
    isActive: true,
  },
  {
    title: 'Research & Evaluation',
    slug: 'research-and-evaluation',
    category: 'evidence',
    tag: 'Evidence',
    description:
      'Independent evaluations, monitoring reports, and applied research from our hubs and partners.',
    accent: 'hsl(var(--amber))',
    displayOrder: 2,
    isActive: true,
  },
  {
    title: 'Open Curricula',
    slug: 'open-curricula',
    category: 'curricula',
    tag: 'Curricula',
    description:
      'Course outlines and learning materials that partners can adapt for their own communities.',
    accent: 'hsl(160,55%,42%)',
    displayOrder: 3,
    isActive: true,
  },
  {
    title: 'Policies & Safeguards',
    slug: 'policies-and-safeguards',
    category: 'policies',
    tag: 'Policies',
    description:
      'Safeguarding, data protection, code of conduct, and financial governance documents.',
    accent: 'hsl(280,45%,55%)',
    displayOrder: 4,
    isActive: true,
  },
];

async function run() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let created = 0;
    let skipped = 0;

    for (const item of samples) {
      const existing = await Resource.findOne({ where: { slug: item.slug } });
      if (existing) {
        skipped += 1;
        continue;
      }
      await Resource.create(item);
      created += 1;
    }

    console.log(`Resources seed done. created=${created}, skipped=${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('Resources seed failed:', err.message);
    process.exit(1);
  }
}

run();
