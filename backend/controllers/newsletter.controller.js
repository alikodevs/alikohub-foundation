const db = require('../models');
const { Op } = require('sequelize');
const { captureSubscriber } = require('../services/crmCapture');
const { sendWelcomeEmail } = require('../services/email.service');

const { Subscriber } = db;

// POST /api/subscribers
const subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email || !String(email).trim()) {
      return res.status(400).json({ message: 'email is required' });
    }

    const emailValue = String(email).trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailOk) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const sourceValue = source || req.body.sourcePage || 'website';

    const { subscriber } = await captureSubscriber({
      email: emailValue,
      source: sourceValue,
    });

    // Send welcome email asynchronously without blocking the response
    sendWelcomeEmail(emailValue).catch((err) => {
      console.error('[Subscribe] Non-fatal welcome email error:', err.message);
    });

    return res.status(200).json({
      message: 'Subscribed successfully',
      subscriber,
    });
  } catch (err) {
    console.error('Subscribe error:', err.message);
    return res.status(500).json({ message: 'Server error subscribing' });
  }
};

// PATCH /api/subscribers/unsubscribe
const unsubscribe = async (req, res) => {
  try {
    const { email, token } = req.body;
    const identifier = email || token;

    if (!identifier || !String(identifier).trim()) {
      return res.status(400).json({ message: 'email or token is required' });
    }

    const value = String(identifier).trim().toLowerCase();
    const subscriber = await Subscriber.findOne({
      where: {
        [Op.or]: [
          { id: value },
          { email: value },
        ],
      },
    });

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.json({ message: 'Already unsubscribed', status: 'unsubscribed' });
    }

    await subscriber.update({ status: 'unsubscribed' });

    return res.json({ message: 'Unsubscribed successfully', status: 'unsubscribed' });
  } catch (err) {
    console.error('Unsubscribe error:', err.message);
    return res.status(500).json({ message: 'Server error unsubscribing' });
  }
};

// GET /api/subscribers/status/:token
const getStatus = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ message: 'token is required' });
    }

    const value = decodeURIComponent(token).trim().toLowerCase();
    const subscriber = await Subscriber.findOne({
      where: {
        [Op.or]: [
          { id: value },
          { email: value },
        ],
      },
    });

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found', status: 'not_found' });
    }

    return res.json({ status: subscriber.status, email: subscriber.email });
  } catch (err) {
    console.error('Get subscriber status error:', err.message);
    return res.status(500).json({ message: 'Server error retrieving status' });
  }
};

// GET /api/admin/subscribers
const listSubscribers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 20);
    const search = req.query.search ? String(req.query.search).trim().toLowerCase() : '';

    const where = {};
    if (search) {
      where[Op.or] = [
        { email: { [Op.iLike || Op.like]: `%${search}%` } },
        { source: { [Op.iLike || Op.like]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Subscriber.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (err) {
    console.error('List subscribers error:', err.message);
    return res.status(500).json({ message: 'Server error listing subscribers' });
  }
};

// GET /api/admin/subscribers/export
const exportSubscribers = async (req, res) => {
  try {
    const search = req.query.search ? String(req.query.search).trim().toLowerCase() : '';

    const where = {};
    if (search) {
      where[Op.or] = [
        { email: { [Op.iLike || Op.like]: `%${search}%` } },
        { source: { [Op.iLike || Op.like]: `%${search}%` } },
      ];
    }

    const subscribers = await Subscriber.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    const headers = ['id', 'email', 'status', 'source', 'created_at'];
    const csvRows = [headers.join(',')];

    for (const sub of subscribers) {
      const row = [
        `"${sub.id}"`,
        `"${sub.email}"`,
        `"${sub.status}"`,
        `"${sub.source || ''}"`,
        `"${sub.createdAt ? sub.createdAt.toISOString() : ''}"`,
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = csvRows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="subscribers.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    console.error('Export subscribers error:', err.message);
    return res.status(500).json({ message: 'Server error exporting subscribers' });
  }
};

// PATCH /api/admin/subscribers/:id/status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'unsubscribed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const subscriber = await Subscriber.findByPk(id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    await subscriber.update({ status });

    return res.json({ message: 'Status updated successfully', data: subscriber });
  } catch (err) {
    console.error('Update status error:', err.message);
    return res.status(500).json({ message: 'Server error updating status' });
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getStatus,
  listSubscribers,
  exportSubscribers,
  updateStatus,
};
