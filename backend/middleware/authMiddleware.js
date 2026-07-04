const jwt = require('jsonwebtoken');
const { query } = require('../models/db');

const getToken = (req) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return null;
  }

  return header.slice(7);
};

const authenticate = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart-restaurant-secret');
    const [rows] = await query('SELECT id, fullname, email, phone, created_at FROM users WHERE id = ? LIMIT 1', [decoded.id]);

    if (!rows.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = rows[0];
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

authenticate.optional = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart-restaurant-secret');
    const [rows] = await query('SELECT id, fullname, email, phone, created_at FROM users WHERE id = ? LIMIT 1', [decoded.id]);

    req.user = rows.length ? rows[0] : null;
    return next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

module.exports = authenticate;
