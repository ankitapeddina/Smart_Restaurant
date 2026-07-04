const express = require('express');
const { createReservation, getReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getReservations);

module.exports = router;
