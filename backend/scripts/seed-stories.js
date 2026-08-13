'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Story } = db;

const samples = [
  {
    type: 'story',
    title: 'Field Voices from Hub Mentors',
    slug: 'field-voices-from-hub-mentors',
    theme: 'Field Voices',
    excerpt:
      'First-person reflections from learners, mentors, and hub leaders shaping the Foundation\'s work on the ground.',
    body:
      'Mentors across our hubs share how community leadership, trust, and patient coaching open doors for learners. These stories are published with consent and grounded in field evidence.',
    imageUrl:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    authorName: 'AlikoHub Field Team',
    displayOrder: 1,
    isActive: true,
  },
  {
    type: 'insight',
    title: 'Program Notes on Practical Pedagogy',
    slug: 'program-notes-on-practical-pedagogy',
    theme: 'Program Notes',
    excerpt:
      'Short, practitioner-focused updates on curriculum, pedagogy, and partnerships across our programs.',
    body:
      'What works in practice often looks quieter than a launch event: clear learning goals, local facilitators, and feedback loops that respect community pace. This insight summarizes patterns from recent cohorts.',
    imageUrl:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Programs Team',
    displayOrder: 2,
    isActive: true,
  },
  {
    type: 'story',
    title: 'Community Impact in WASH and Enterprise',
    slug: 'community-impact-wash-enterprise',
    theme: 'Community Impact',
    excerpt:
      'Case studies from WASH, health, and enterprise programs, documenting what worked, what didn\'t, and why it mattered.',
    body:
      'Communities measuring their own progress tell a clearer story than external snapshots alone. This piece walks through outcomes, trade-offs, and lessons from partner hubs.',
    imageUrl:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Impact Team',
    displayOrder: 3,
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
      const existing = await Story.findOne({ where: { slug: item.slug } });
      if (existing) {
        skipped += 1;
        continue;
      }
      await Story.create({ ...item, publishedAt: new Date() });
      created += 1;
    }

    console.log(`Stories seed done. created=${created}, skipped=${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('Stories seed failed:', err.message);
    process.exit(1);
  }
}

run();
