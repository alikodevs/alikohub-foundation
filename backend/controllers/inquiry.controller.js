const { captureInquiry } = require('../services/crmCapture');

const ALLOWED_TYPES = ['partnership', 'volunteer', 'media', 'general'];

// POST /api/inquiries  (public — no login)
const createInquiry = async (req, res) => {
  try {
    const {
      inquiryType = 'general',
      name,
      email,
      organization,
      message,
      sourcePage,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'name, email, and message are required',
      });
    }

    if (String(message).trim().length < 10) {
      return res.status(400).json({
        message: 'message must be at least 10 characters',
      });
    }

    if (!ALLOWED_TYPES.includes(inquiryType)) {
      return res.status(400).json({
        message: `inquiryType must be one of: ${ALLOWED_TYPES.join(', ')}`,
      });
    }

    const { inquiry, contact } = await captureInquiry({
      inquiryType,
      name: String(name).trim(),
      email: String(email).trim(),
      organization: organization ? String(organization).trim() : null,
      message: String(message).trim(),
      sourcePage: sourcePage || null,
    });

    return res.status(201).json({
      message: 'Thank you. Your inquiry has been received.',
      inquiry,
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        contactType: contact.contactType,
      },
    });
  } catch (err) {
    console.error('Create inquiry error:', err.message);
    return res.status(500).json({ message: 'Server error submitting inquiry' });
  }
};

module.exports = { createInquiry };
