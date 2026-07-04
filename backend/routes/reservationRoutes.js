const express = require('express');
const { createReservation, getReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.optional, createReservation);
router.get('/', authMiddleware.optional, getReservations);

module.exports = router;
