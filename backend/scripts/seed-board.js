'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Board } = db;

const samples = [
  {
    name: 'Boni Aliko',
    role: 'Chairman and Director',
    bio: "Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.",
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
  },
  {
    name: 'Eyouel Berhe, MBA',
    role: 'Treasurer; Board Member',
    bio: "Oversees financial stewardship, reserves policy, and donor accountability, ensuring every dollar advances the Foundation's mission.",
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
  },
  {
    name: 'Hanna Tesfaye',
    role: 'Secretary',
    bio: 'Leads governance, board coordination, and safeguarding oversight, keeping the Foundation accountable to its communities and partners.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
  },
];

async function run() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let created = 0;
    let updated = 0;

    for (const item of samples) {
      const existing = await Board.findOne({
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
      await Board.create({ ...item, isActive: true });
      created += 1;
    }

    console.log(`Board seed done. created=${created}, updated=${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('Board seed failed:', err.message);
    process.exit(1);
  }
}

run();
