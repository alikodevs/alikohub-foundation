const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const admin = require('../controllers/admin.controller');
const {
  listSubscribers,
  exportSubscribers,
  updateStatus,
} = require('../controllers/newsletter.controller');

router.use(protect, requireAdmin);

router.get('/dashboard', admin.dashboard);

router.get('/inquiries', admin.inquiries.list);
router.patch('/inquiries/:id', admin.inquiries.update);

router.get('/subscribers', listSubscribers);
router.get('/subscribers/export', exportSubscribers);
router.patch('/subscribers/:id/status', updateStatus);

router.get('/newsletter', listSubscribers);
router.patch('/newsletter/:id', (req, res) => updateStatus(req, res));

router.get('/contacts', admin.contacts.list);
router.get('/contacts/:id', admin.contacts.getOne);
router.post('/contacts', admin.contacts.create);
router.patch('/contacts/:id', admin.contacts.update);
router.delete('/contacts/:id', admin.contacts.remove);

router.get('/organizations', admin.organizations.list);
router.get('/organizations/:id', admin.organizations.getOne);
router.post('/organizations', admin.organizations.create);
router.patch('/organizations/:id', admin.organizations.update);
router.delete('/organizations/:id', admin.organizations.remove);

router.get('/deals', admin.deals.list);
router.get('/deals/:id', admin.deals.getOne);
router.post('/deals', admin.deals.create);
router.patch('/deals/:id', admin.deals.update);
router.delete('/deals/:id', admin.deals.remove);

router.get('/tasks', admin.tasks.list);
router.get('/tasks/:id', admin.tasks.getOne);
router.post('/tasks', admin.tasks.create);
router.patch('/tasks/:id', admin.tasks.update);
router.delete('/tasks/:id', admin.tasks.remove);

router.get('/donations', admin.donations.list);
router.get('/donations/:id', admin.donations.getOne);
router.post('/donations', admin.donations.create);
router.patch('/donations/:id', admin.donations.update);
router.delete('/donations/:id', admin.donations.remove);

router.get('/activities', admin.activities.list);
router.post('/activities', admin.activities.create);

router.get('/notification-settings', admin.notificationSettings.get);
router.patch('/notification-settings', admin.notificationSettings.update);

router.get('/board', admin.board.list);
router.get('/board/:id', admin.board.getOne);
router.post('/board', admin.board.create);
router.patch('/board/:id', admin.board.update);
router.delete('/board/:id', admin.board.remove);

router.get('/staff', admin.staff.list);
router.get('/staff/:id', admin.staff.getOne);
router.post('/staff', admin.staff.create);
router.patch('/staff/:id', admin.staff.update);
router.delete('/staff/:id', admin.staff.remove);

router.get('/services', admin.services.list);
router.post('/services', admin.services.create);
router.patch('/services/:id', admin.services.update);
router.delete('/services/:id', admin.services.remove);

router.get('/programs', admin.programs.list);
router.post('/programs', admin.programs.create);
router.patch('/programs/:id', admin.programs.update);
router.delete('/programs/:id', admin.programs.remove);

router.get('/stories', admin.stories.list);
router.get('/stories/:id', admin.stories.getOne);
router.post('/stories', admin.stories.create);
router.patch('/stories/:id', admin.stories.update);
router.delete('/stories/:id', admin.stories.remove);

router.get('/resources', admin.resources.list);
router.get('/resources/:id', admin.resources.getOne);
router.post('/resources', admin.resources.create);
router.patch('/resources/:id', admin.resources.update);
router.delete('/resources/:id', admin.resources.remove);

router.get('/faqs', admin.faqs.list);
router.get('/faqs/:id', admin.faqs.getOne);
router.post('/faqs', admin.faqs.create);
router.patch('/faqs/:id', admin.faqs.update);
router.delete('/faqs/:id', admin.faqs.remove);

router.get('/media', admin.media.list);
router.post('/media', upload.single('file'), admin.media.create);
router.delete('/media/:id', admin.media.remove);

module.exports = router;
