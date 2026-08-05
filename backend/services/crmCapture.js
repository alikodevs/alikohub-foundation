const db = require('../models');

const { CrmContact, FoundationInquiry, CrmActivity, NewsletterSubscriber } = db;

function mapInquiryTypeToContactType(inquiryType) {
  switch (inquiryType) {
    case 'partnership':
      return 'partner';
    case 'volunteer':
      return 'volunteer';
    case 'media':
      return 'media';
    default:
      return 'other';
  }
}

/**
 * Save inquiry + find/create CRM contact + add activity timeline note.
 * @param {object} data form fields from the website
 */
async function captureInquiry(data) {
  const {
    inquiryType = 'general',
    name,
    email,
    organization = null,
    message,
    sourcePage = null,
  } = data;

  return db.sequelize.transaction(async (t) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const contactType = mapInquiryTypeToContactType(inquiryType);

    // 1) Find existing contact by email (we store emails in lowercase)
    let contact = await CrmContact.findOne({
      where: { email: normalizedEmail },
      transaction: t,
    });

    // 2) Create or update contact
    if (!contact) {
      contact = await CrmContact.create(
        {
          name,
          email: normalizedEmail,
          organizationName: organization || null,
          contactType,
          lifecycleStage: 'lead',
          source: sourcePage || 'website inquiry',
        },
        { transaction: t }
      );
    } else {
      await contact.update(
        {
          name,
          organizationName: organization || contact.organizationName,
        },
        { transaction: t }
      );
    }

    // 3) Save the inquiry (the form ticket)
    const inquiry = await FoundationInquiry.create(
      {
        inquiryType,
        name,
        email: normalizedEmail,
        organization: organization || null,
        message,
        sourcePage,
        status: 'new',
        contactId: contact.id,
      },
      { transaction: t }
    );

    // 4) Save timeline activity
    await CrmActivity.create(
      {
        contactId: contact.id,
        activityType: 'form_submission',
        subject: `Website inquiry: ${inquiryType}`,
        body: message,
      },
      { transaction: t }
    );

    return { inquiry, contact };
  });
}

/**
 * Subscribe email to newsletter + find/create CRM contact + activity.
 * Throws err.name === 'SequelizeUniqueConstraintError' if already subscribed.
 */
async function captureSubscriber(data) {
  const { email, name = null, sourcePage = null } = data;

  return db.sequelize.transaction(async (t) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const displayName = name || normalizedEmail.split('@')[0];

    // 1) Create subscriber (unique email)
    const subscriber = await NewsletterSubscriber.create(
      {
        email: normalizedEmail,
        name: name || null,
        sourcePage,
        status: 'subscribed',
      },
      { transaction: t }
    );

    // 2) Find or create CRM contact
    let contact = await CrmContact.findOne({
      where: { email: normalizedEmail },
      transaction: t,
    });

    if (!contact) {
      contact = await CrmContact.create(
        {
          name: displayName,
          email: normalizedEmail,
          contactType: 'other',
          lifecycleStage: 'lead',
          source: sourcePage || 'newsletter',
          notes: 'newsletter',
        },
        { transaction: t }
      );
    } else {
      const note = contact.notes || '';
      if (!note.includes('newsletter')) {
        await contact.update(
          {
            notes: note ? `${note}; newsletter` : 'newsletter',
          },
          { transaction: t }
        );
      }
    }

    // 3) Timeline activity
    await CrmActivity.create(
      {
        contactId: contact.id,
        activityType: 'form_submission',
        subject: 'Newsletter subscription',
        body: sourcePage || 'newsletter',
      },
      { transaction: t }
    );

    return { subscriber, contact };
  });
}

module.exports = {
  captureInquiry,
  captureSubscriber,
  mapInquiryTypeToContactType,
};

