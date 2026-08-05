const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  me,
  claimFirstAdmin,
  adminCheck,
} = require('../controllers/auth.controller');
const { protect, requireAdmin } = require('../middleware/auth');

// Public
router.post('/signup', signup);
router.post('/login', login);

// Logged-in only
router.get('/me', protect, me);
router.post('/claim-first-admin', protect, claimFirstAdmin);

// Logged-in + admin only
router.get('/admin-check', protect, requireAdmin, adminCheck);

module.exports = router;
