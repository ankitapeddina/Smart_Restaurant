const { query } = require('../models/db');
const { sendReservationSMS } = require('../services/smsService');

const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

exports.createReservation = async (req, res) => {
  const { name, phone, reservation_date, reservation_time, people_count, special_request } = req.body;

  if (!name || !phone || !reservation_date || !reservation_time || !people_count) {
    return res.status(400).json({ message: 'Name, phone, date, time, and people count are required' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Please enter a valid phone number' });
  }

  const people = Number(people_count);
  if (!Number.isInteger(people) || people < 1) {
    return res.status(400).json({ message: 'People count must be a positive number' });
  }

  try {
    const userId = req.user?.id ?? null;
    
    // Insert reservation into database
    const [result] = await query(
      'INSERT INTO reservations (user_id, name, phone, reservation_date, reservation_time, people_count, special_request, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [userId, name.trim(), phone.trim(), reservation_date, reservation_time, people, special_request ? special_request.trim() : null],
    );

    // Prepare reservation details for SMS and response
    const reservationData = {
      id: result.insertId,
      customerName: name.trim(),
      phone: phone.trim(),
      reservationDate: reservation_date,
      reservationTime: reservation_time,
      guestCount: people,
      specialRequest: special_request ? special_request.trim() : null,
      createdAt: new Date(),
    };

    // Send SMS (non-blocking - SMS failure doesn't cancel the reservation)
    const smsResult = await sendReservationSMS(phone.trim(), {
      customerName: name.trim(),
      reservationDate: reservation_date,
      reservationTime: reservation_time,
      guestCount: people,
    });

    // Build response based on SMS result
    let responseMessage = '';
    let smsError = null;

    if (smsResult.smsSent) {
      responseMessage = 'Reservation confirmed and SMS sent successfully';
    } else {
      responseMessage = 'Reservation saved. SMS delivery failed.';
      smsError = smsResult.message || 'Unknown error';
      console.warn('[Reservation Controller] SMS Error:', smsError);
    }

    console.log('[Reservation Controller] Final Response:', {
      message: responseMessage,
      smsSent: smsResult.smsSent,
      smsError: smsError,
    });

    return res.status(201).json({
      message: responseMessage,
      success: true,
      smsSent: smsResult.smsSent,
      smsError: smsError,
      reservation: reservationData,
    });
  } catch (error) {
    console.error('Reservation creation error:', error);
    return res.status(500).json({ message: 'Unable to save reservation at this time' });
  }
};

exports.getReservations = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.json({ reservations: [] });
    }

    const [rows] = await query(
      `SELECT r.id, r.name, r.phone, r.reservation_date, r.reservation_time, r.people_count, r.special_request, r.created_at
       FROM reservations r
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [req.user.id],
    );

    return res.json({ reservations: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch reservations' });
  }
};
