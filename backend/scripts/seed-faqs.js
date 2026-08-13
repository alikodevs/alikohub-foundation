'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('../models');
const { Faq } = db;

const samples = [
  {
    category: 'About',
    question: 'What does AlikoHub Foundation do?',
    answer:
      'We build pathways for youth through education, workforce development, technology, health, water and sanitation, entrepreneurship, and community resilience programs, designed with the communities we serve.',
    displayOrder: 1,
  },
  {
    category: 'About',
    question: 'Where does the Foundation work?',
    answer:
      'Our operating base is Seattle, Washington in the United States, with active program work in Ethiopia. We partner globally, but scale is disciplined and community-led.',
    displayOrder: 2,
  },
  {
    category: 'About',
    question: 'How is the Foundation different from AlikoHub the company?',
    answer:
      'The Foundation is a nonprofit with independent governance, finances, and program accountability. It operates separately from any commercial AlikoHub entity.',
    displayOrder: 3,
  },
  {
    category: 'Support',
    question: 'How can I support the Foundation?',
    answer:
      'You can partner with us, volunteer expertise, or contribute financially. Visit Get Involved or Partnerships to begin a conversation.',
    displayOrder: 4,
  },
  {
    category: 'Support',
    question: 'Is my contribution tax-deductible?',
    answer:
      'AlikoHub Foundation is a 501(c)(3) nonprofit. Contributions are tax-deductible to the fullest extent allowed by law. Consult your tax advisor for your specific situation.',
    displayOrder: 5,
  },
  {
    category: 'Accountability',
    question: 'How do you measure impact?',
    answer:
      'We define outcomes with communities and partners, collect proportionate data, protect participant privacy, and publish results in our Annual Report and Impact page.',
    displayOrder: 6,
  },
  {
    category: 'Accountability',
    question: 'How do you protect participant data and safety?',
    answer:
      'Safeguarding is a board-level responsibility. We follow data-minimization, consent, and protection practices described in our Ethics and Privacy pages.',
    displayOrder: 7,
  },
  {
    category: 'Contact',
    question: 'How can I contact the Foundation?',
    answer:
      'Email info@alikohubfoundation.org or use the Contact page. Media and partnership inquiries are routed to the appropriate team.',
    displayOrder: 8,
  },
];

async function run() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    let created = 0;
    let skipped = 0;

    for (const item of samples) {
      const existing = await Faq.findOne({ where: { question: item.question } });
      if (existing) {
        skipped += 1;
        continue;
      }
      await Faq.create({ ...item, isActive: true });
      created += 1;
    }

    console.log(`FAQs seed done. created=${created}, skipped=${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('FAQs seed failed:', err.message);
    process.exit(1);
  }
}

run();
