const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const admin = require('../controllers/admin.controller');

router.use(protect, requireAdmin);

router.get('/dashboard', admin.dashboard);

router.get('/inquiries', admin.inquiries.list);
router.patch('/inquiries/:id', admin.inquiries.update);

router.get('/newsletter', admin.newsletter.list);
router.patch('/newsletter/:id', admin.newsletter.update);
router.delete('/newsletter/:id', admin.newsletter.remove);

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

router.get('/hero', admin.hero.list);
router.post('/hero', admin.hero.create);
router.patch('/hero/:id', admin.hero.update);
router.delete('/hero/:id', admin.hero.remove);

router.get('/team', admin.team.list);
router.post('/team', admin.team.create);
router.patch('/team/:id', admin.team.update);
router.delete('/team/:id', admin.team.remove);

router.get('/services', admin.services.list);
router.post('/services', admin.services.create);
router.patch('/services/:id', admin.services.update);
router.delete('/services/:id', admin.services.remove);

router.get('/programs', admin.programs.list);
router.post('/programs', admin.programs.create);
router.patch('/programs/:id', admin.programs.update);
router.delete('/programs/:id', admin.programs.remove);

router.get('/media', admin.media.list);
router.post('/media', upload.single('file'), admin.media.create);
router.delete('/media/:id', admin.media.remove);

module.exports = router;
