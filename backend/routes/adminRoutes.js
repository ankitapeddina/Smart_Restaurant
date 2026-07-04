const express = require('express');
const { registerAdmin, loginAdmin, forgotAdminPassword, getDashboard, getProfile, updateProfile, changePassword } = require('../controllers/adminController');
const { listReservations, updateReservation, deleteReservation } = require('../controllers/reservationAdminController');
const { listOrders, updateOrder, deleteOrder } = require('../controllers/orderAdminController');
const { listCustomers, deleteCustomer } = require('../controllers/customerAdminController');
const { getReports } = require('../controllers/reportController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/forgot-password', forgotAdminPassword);
router.get('/profile', adminMiddleware, getProfile);
router.put('/profile', adminMiddleware, updateProfile);
router.put('/change-password', adminMiddleware, changePassword);
router.get('/dashboard', adminMiddleware, getDashboard);
router.get('/reservations', adminMiddleware, listReservations);
router.put('/reservations/:id', adminMiddleware, updateReservation);
router.delete('/reservations/:id', adminMiddleware, deleteReservation);
router.get('/orders', adminMiddleware, listOrders);
router.put('/orders/:id', adminMiddleware, updateOrder);
router.delete('/orders/:id', adminMiddleware, deleteOrder);
router.get('/customers', adminMiddleware, listCustomers);
router.delete('/customers/:id', adminMiddleware, deleteCustomer);
router.get('/reports', adminMiddleware, getReports);

module.exports = router;
