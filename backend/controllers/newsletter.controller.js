const { captureSubscriber } = require('../services/crmCapture');

// POST /api/newsletter/subscribe  (public)
const subscribe = async (req, res) => {
  try {
    const { email, name, sourcePage } = req.body;

    if (!email || !String(email).trim()) {
      return res.status(400).json({ message: 'email is required' });
    }

    const emailValue = String(email).trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailOk) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }

    const { subscriber, contact } = await captureSubscriber({
      email: emailValue,
      name: name ? String(name).trim() : null,
      sourcePage: sourcePage || null,
    });

    return res.status(201).json({
      message: "You're on the list. Thanks for subscribing.",
      subscriber,
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
      },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: "You're already subscribed. Thank you for your interest.",
      });
    }

    console.error('Newsletter subscribe error:', err.message);
    return res.status(500).json({ message: 'Server error subscribing' });
  }
};

module.exports = { subscribe };
