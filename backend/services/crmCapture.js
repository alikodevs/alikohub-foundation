const db = require('../models');

const { CrmContact, FoundationInquiry, CrmActivity, Subscriber } = db;

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
 * Subscribe email to newsletter + find/create CRM contact.
 */
async function captureSubscriber(data) {
  const { email, source = 'website' } = data;

  return db.sequelize.transaction(async (t) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const displayName = normalizedEmail.split('@')[0];

    // 1) Find or create/reactivate subscriber
    let subscriber = await Subscriber.findOne({
      where: { email: normalizedEmail },
      transaction: t,
    });

    let isNew = false;
    let reactivated = false;

    if (subscriber) {
      if (subscriber.status === 'unsubscribed') {
        await subscriber.update(
          { status: 'active', source: source || subscriber.source },
          { transaction: t }
        );
        reactivated = true;
      }
    } else {
      subscriber = await Subscriber.create(
        {
          email: normalizedEmail,
          status: 'active',
          source: source || 'website',
        },
        { transaction: t }
      );
      isNew = true;
    }

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
          source: source || 'newsletter',
          notes: 'newsletter',
        },
        { transaction: t }
      );
    }

    return { subscriber, contact, isNew, reactivated };
  });
}

module.exports = {
  captureInquiry,
  captureSubscriber,
  mapInquiryTypeToContactType,
};

