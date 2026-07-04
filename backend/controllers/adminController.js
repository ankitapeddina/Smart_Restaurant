const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const secret = process.env.JWT_SECRET || 'smart-restaurant-secret';
const createToken = (admin) => jwt.sign({ adminId: admin.admin_id, role: admin.role || 'admin' }, secret, { expiresIn: '8h' });
const normalizeAdmin = (admin) => ({ id: admin.admin_id, name: admin.full_name, email: admin.email, role: admin.role === 'Super Admin' ? 'super_admin' : 'admin' });

exports.registerAdmin = async (req, res) => {
  const { full_name, email, password, confirm_password } = req.body;
  console.log('[ADMIN] Registration request received', { full_name, email });

  if (!full_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const [existingRows] = await query('SELECT admin_id FROM admins WHERE email = ? LIMIT 1', [email.toLowerCase()]);
    if (existingRows.length) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const [countRows] = await query('SELECT COUNT(*) AS total FROM admins');
    const isFirstAdmin = Number(countRows[0].total) === 0;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = isFirstAdmin ? 'Super Admin' : 'Admin';

    const [result] = await query(
      'INSERT INTO admins (full_name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [full_name.trim(), email.toLowerCase(), hashedPassword, role],
    );

    const [rows] = await query('SELECT admin_id, full_name, email, role, created_at FROM admins WHERE admin_id = ? LIMIT 1', [result.insertId]);
    const admin = rows[0];
    const token = createToken(admin);
    console.log('[ADMIN] Registration result', { adminId: admin.admin_id, email: admin.email, role });
    return res.status(201).json({ message: 'Admin registered successfully', admin: normalizeAdmin(admin), token });
  } catch (error) {
    console.error('[ADMIN] Registration failed', error);
    if (error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ message: 'Database connection failed' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log('[ADMIN] Login request received', { email });

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await query('SELECT admin_id, full_name, email, password, role FROM admins WHERE email = ? LIMIT 1', [email.toLowerCase()]);
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(admin);
    console.log('[ADMIN] Login result', { adminId: admin.admin_id, email: admin.email, role: admin.role });
    return res.json({ message: 'Login successful', token, admin: normalizeAdmin(admin) });
  } catch (error) {
    console.error('[ADMIN] Login failed', error);
    if (error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ message: 'Database connection failed' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    return res.json({ admin: normalizeAdmin(req.admin) });
  } catch (error) {
    console.error('[ADMIN] Profile fetch failed', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { full_name, email } = req.body;

  try {
    const [existingRows] = await query('SELECT admin_id FROM admins WHERE email = ? AND admin_id != ? LIMIT 1', [email.toLowerCase(), req.admin.admin_id]);
    if (existingRows.length) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await query('UPDATE admins SET full_name = ?, email = ? WHERE admin_id = ?', [full_name, email.toLowerCase(), req.admin.admin_id]);
    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('[ADMIN] Profile update failed', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;

  if (!current_password || !new_password || !confirm_password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (new_password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const [rows] = await query('SELECT password FROM admins WHERE admin_id = ? LIMIT 1', [req.admin.admin_id]);
    const currentAdmin = rows[0];
    const valid = await bcrypt.compare(current_password, currentAdmin.password);
    if (!valid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await query('UPDATE admins SET password = ? WHERE admin_id = ?', [hashedPassword, req.admin.admin_id]);
    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('[ADMIN] Password change failed', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotAdminPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [rows] = await query('SELECT admin_id FROM admins WHERE email = ? LIMIT 1', [email.toLowerCase()]);
    if (!rows.length) {
      return res.json({ message: 'If an admin account exists, a reset link has been generated.' });
    }

    return res.json({ message: 'If an admin account exists, a reset link has been generated.' });
  } catch (error) {
    console.error('[ADMIN] Password reset failed', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const [customerCount] = await query('SELECT COUNT(*) AS count FROM customers');
    const [reservationCount] = await query('SELECT COUNT(*) AS count FROM reservations');
    const [pendingReservations] = await query("SELECT COUNT(*) AS count FROM reservations WHERE status = 'Pending'");
    const [orderCount] = await query('SELECT COUNT(*) AS count FROM orders');
    const [revenue] = await query("SELECT COALESCE(SUM(total_amount), 0) AS total FROM orders WHERE payment_status = 'Paid'");
    const [cancelledOrders] = await query("SELECT COUNT(*) AS count FROM orders WHERE order_status = 'Cancelled'");
    const [pendingOrders] = await query("SELECT COUNT(*) AS count FROM orders WHERE order_status = 'Pending'");
    const [recentCustomers] = await query('SELECT customer_id, full_name, email, created_at FROM customers ORDER BY created_at DESC LIMIT 5');

    return res.json({
      summary: {
        customers: customerCount[0]?.count || 0,
        reservations: reservationCount[0]?.count || 0,
        pendingReservations: pendingReservations[0]?.count || 0,
        orders: orderCount[0]?.count || 0,
        revenue: Number(revenue[0]?.total || 0),
        cancelledOrders: cancelledOrders[0]?.count || 0,
        pendingOrders: pendingOrders[0]?.count || 0,
      },
      recentCustomers,
    });
  } catch (error) {
    console.error('[ADMIN] Dashboard data failed', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
