const express = require('express');
const router = express.Router();
const { publicCms } = require('../controllers/admin.controller');

router.get('/hero', publicCms.hero);
router.get('/team', publicCms.team);
router.get('/services', publicCms.services);
router.get('/programs', publicCms.programs);

module.exports = router;
