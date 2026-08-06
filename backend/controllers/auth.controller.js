const db = require('../models');
const jwt = require('jsonwebtoken');

const { User, Profile, UserRole } = db;

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

async function getUserWithRelations(userId) {
  return User.findByPk(userId, {
    attributes: { exclude: ['passwordHash'] },
    include: [
      { model: Profile, as: 'profile' },
      { model: UserRole, as: 'roles' },
    ],
  });
}

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const result = await db.sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          email,
          passwordHash: password,
          displayName: displayName || null,
        },
        { transaction: t }
      );

      await Profile.create(
        {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
        },
        { transaction: t }
      );

      await UserRole.create(
        {
          userId: user.id,
          role: 'user',
        },
        { transaction: t }
      );

      return user;
    });

    const token = signToken(result.id);
    const user = await getUserWithRelations(result.id);

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ message: 'Server error during signup' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = signToken(user.id);
    const fullUser = await getUserWithRelations(user.id);

    return res.json({ token, user: fullUser });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  try {
    const user = await getUserWithRelations(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  } catch (err) {
    console.error('Me error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/auth/admin-check  (simple test route for requireAdmin)
const adminCheck = async (req, res) => {
  return res.json({ ok: true, message: 'Admin access confirmed', userId: req.user.id });
};

module.exports = { signup, login, me, adminCheck };
