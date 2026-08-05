const express = require('express');
const router = express.Router();
const { createInquiry } = require('../controllers/inquiry.controller');

// Public form submit
router.post('/', createInquiry);

module.exports = router;
