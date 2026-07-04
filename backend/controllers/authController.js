const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../models/db');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'smart-restaurant-secret', {
    expiresIn: '7d',
  });

exports.register = async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  if (!fullname || !email || !phone || !password) {
    return res.status(400).json({ message: 'Full name, email, phone, and password are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Please enter a valid phone number' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const [existingRows] = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]);

    if (existingRows.length) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await query(
      'INSERT INTO users (fullname, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())',
      [fullname.trim(), email.toLowerCase(), phone.trim(), hashedPassword],
    );

    const [rows] = await query('SELECT id, fullname, email, phone, created_at FROM users WHERE id = ? LIMIT 1', [result.insertId]);
    const user = rows[0];
    const token = createToken(user);

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to register user at this time' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await query('SELECT id, fullname, email, phone, password FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]);

    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to login at this time' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const normalized = email.toLowerCase();
  try {
    const [rows] = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [normalized]);
    if (!rows.length) {
      return res.json({ message: 'If an account exists, we have sent password reset instructions to your email.' });
    }

    return res.json({ message: 'If an account exists, we have sent password reset instructions to your email.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to process password reset' });
  }
};

exports.logout = async (req, res) => {
  return res.json({ message: 'Logout successful' });
};

exports.getProfile = async (req, res) => {
  return res.json({ user: req.user });
};
