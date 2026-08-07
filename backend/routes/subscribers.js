const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe, getStatus } = require('../controllers/newsletter.controller');

router.post('/', subscribe);
router.patch('/unsubscribe', unsubscribe);
router.get('/status/:token', getStatus);

module.exports = router;
