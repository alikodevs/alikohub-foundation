const express = require('express');
const router = express.Router();
const { publicCms } = require('../controllers/admin.controller');

router.get('/board', publicCms.board);
router.get('/board/:id', publicCms.boardOne);
router.get('/staff', publicCms.staff);
router.get('/staff/:id', publicCms.staffOne);

router.get('/services', publicCms.services);
router.get('/programs', publicCms.programs);

router.get('/stories', publicCms.stories);
router.get('/stories/:idOrSlug', publicCms.storyOne);
router.get('/insights', publicCms.insights);
router.get('/insights/:idOrSlug', publicCms.insightOne);

router.get('/resources', publicCms.resources);
router.get('/resources/:idOrSlug', publicCms.resourceOne);

router.get('/faqs', publicCms.faqs);
router.get('/faqs/:id', publicCms.faqOne);

module.exports = router;
