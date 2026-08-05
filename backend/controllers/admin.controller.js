const db = require('../models');
const { createCrudController } = require('./crudFactory');
const path = require('path');
const fs = require('fs');

const {
  FoundationInquiry,
  NewsletterSubscriber,
  CrmContact,
  CrmOrganization,
  CrmDeal,
  CrmActivity,
  CrmTask,
  CrmDonation,
  CrmNotificationSetting,
  HeroContent,
  TeamMember,
  Service,
  Program,
  MediaLibrary,
} = db;

const contacts = createCrudController(CrmContact);
const organizations = createCrudController(CrmOrganization);
const deals = createCrudController(CrmDeal);
const tasks = createCrudController(CrmTask);
const donations = createCrudController(CrmDonation);
const hero = createCrudController(HeroContent);
const team = createCrudController(TeamMember, {
  order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
});
const services = createCrudController(Service, {
  order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
});
const programs = createCrudController(Program, {
  order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
});

const inquiries = {
  list: async (req, res) => {
    try {
      const where = {};
      if (req.query.status) where.status = req.query.status;
      const data = await FoundationInquiry.findAll({
        where,
        order: [['createdAt', 'DESC']],
      });
      return res.json({ data });
    } catch (err) {
      console.error('Admin inquiries list:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  update: async (req, res) => {
    try {
      const row = await FoundationInquiry.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      const { status, adminNotes } = req.body;
      await row.update({
        ...(status !== undefined ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      });
      return res.json({ data: row });
    } catch (err) {
      console.error('Admin inquiries update:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

const newsletter = {
  list: async (req, res) => {
    try {
      const where = {};
      if (req.query.status) where.status = req.query.status;
      const data = await NewsletterSubscriber.findAll({
        where,
        order: [['createdAt', 'DESC']],
      });
      return res.json({ data });
    } catch (err) {
      console.error('Admin newsletter list:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  update: async (req, res) => {
    try {
      const row = await NewsletterSubscriber.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      await row.update({ status: req.body.status ?? row.status });
      return res.json({ data: row });
    } catch (err) {
      console.error('Admin newsletter update:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  remove: async (req, res) => {
    try {
      const row = await NewsletterSubscriber.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      await row.destroy();
      return res.json({ message: 'Deleted' });
    } catch (err) {
      console.error('Admin newsletter delete:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

const activities = {
  list: async (req, res) => {
    try {
      const where = {};
      if (req.query.contactId) where.contactId = req.query.contactId;
      if (req.query.dealId) where.dealId = req.query.dealId;
      const limit = Math.min(Number(req.query.limit) || 50, 200);
      const data = await CrmActivity.findAll({
        where,
        order: [['occurredAt', 'DESC'], ['createdAt', 'DESC']],
        limit,
      });
      return res.json({ data });
    } catch (err) {
      console.error('Admin activities list:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  create: async (req, res) => {
    try {
      const row = await CrmActivity.create({
        ...req.body,
        createdBy: req.user?.id || null,
        occurredAt: req.body.occurredAt || new Date(),
      });
      return res.status(201).json({ data: row });
    } catch (err) {
      console.error('Admin activities create:', err.message);
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  },
};

const notificationSettings = {
  get: async (req, res) => {
    try {
      let row = await CrmNotificationSetting.findOne({ where: { singleton: true } });
      if (!row) {
        row = await CrmNotificationSetting.create({ singleton: true });
      }
      return res.json({ data: row });
    } catch (err) {
      console.error('Notification settings get:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  update: async (req, res) => {
    try {
      let row = await CrmNotificationSetting.findOne({ where: { singleton: true } });
      if (!row) {
        row = await CrmNotificationSetting.create({ singleton: true, ...req.body });
      } else {
        await row.update(req.body);
      }
      return res.json({ data: row });
    } catch (err) {
      console.error('Notification settings update:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

const media = {
  list: async (req, res) => {
    try {
      const data = await MediaLibrary.findAll({ order: [['createdAt', 'DESC']] });
      return res.json({ data });
    } catch (err) {
      console.error('Media list:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  create: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'file is required' });
      }

      const publicUrl = `/uploads/${req.file.filename}`;
      const row = await MediaLibrary.create({
        name: req.body.name || req.file.originalname,
        url: publicUrl,
        altText: req.body.altText || null,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        uploadedBy: req.user?.id || null,
      });

      return res.status(201).json({ data: row });
    } catch (err) {
      console.error('Media upload:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  remove: async (req, res) => {
    try {
      const row = await MediaLibrary.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });

      if (row.url && row.url.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', row.url);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await row.destroy();
      return res.json({ message: 'Deleted' });
    } catch (err) {
      console.error('Media delete:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

const dashboard = async (req, res) => {
  try {
    const [
      heroCount,
      teamCount,
      servicesCount,
      programsCount,
      mediaCount,
      contactsCount,
      newInquiries,
      prospectDeals,
      openTasks,
      subscribed,
      donations,
      recentActivities,
    ] = await Promise.all([
      HeroContent.count(),
      TeamMember.count(),
      Service.count(),
      Program.count(),
      MediaLibrary.count(),
      CrmContact.count(),
      FoundationInquiry.count({ where: { status: 'new' } }),
      CrmDeal.count({ where: { stage: 'prospect' } }),
      CrmTask.count({ where: { status: 'open' } }),
      NewsletterSubscriber.count({ where: { status: 'subscribed' } }),
      CrmDonation.findAll({ attributes: ['amount'] }),
      CrmActivity.findAll({
        order: [['occurredAt', 'DESC']],
        limit: 8,
      }),
    ]);

    const raised = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

    return res.json({
      data: {
        counts: {
          heroContent: heroCount,
          teamMembers: teamCount,
          services: servicesCount,
          programs: programsCount,
          mediaLibrary: mediaCount,
          crmContacts: contactsCount,
          newInquiries,
          prospectDeals,
          openTasks,
          newsletterSubscribed: subscribed,
        },
        raised,
        activities: recentActivities,
      },
    });
  } catch (err) {
    console.error('Dashboard error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Public CMS reads (active only) for frontend later
const publicCms = {
  hero: async (req, res) => {
    const data = await HeroContent.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
    });
    return res.json({ data });
  },
  team: async (req, res) => {
    const data = await TeamMember.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']],
    });
    return res.json({ data });
  },
  services: async (req, res) => {
    const data = await Service.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']],
    });
    return res.json({ data });
  },
  programs: async (req, res) => {
    const data = await Program.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']],
    });
    return res.json({ data });
  },
};

module.exports = {
  contacts,
  organizations,
  deals,
  tasks,
  donations,
  hero,
  team,
  services,
  programs,
  inquiries,
  newsletter,
  activities,
  notificationSettings,
  media,
  dashboard,
  publicCms,
};
