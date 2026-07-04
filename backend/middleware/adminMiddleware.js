const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart-restaurant-secret');
    const [rows] = await query('SELECT admin_id, full_name, email, role, created_at FROM admins WHERE admin_id = ? LIMIT 1', [decoded.adminId]);

    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid admin token' });
    }

    req.admin = {
      ...rows[0],
      role: rows[0].role === 'Super Admin' ? 'super_admin' : 'admin',
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = adminMiddleware;
