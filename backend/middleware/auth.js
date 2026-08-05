const jwt = require('jsonwebtoken');
const db = require('../models');

const { UserRole } = db;

// Gate 1: must be logged in (valid JWT)
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'Server auth is not configured' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Gate 2: must be admin (use AFTER protect)
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const adminRole = await UserRole.findOne({
      where: { userId: req.user.id, role: 'admin' },
    });

    if (!adminRole) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (err) {
    console.error('requireAdmin error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { protect, requireAdmin };
