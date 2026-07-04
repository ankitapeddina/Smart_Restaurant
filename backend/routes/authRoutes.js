const express = require('express');
const { register, login, getProfile, forgotPassword, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
