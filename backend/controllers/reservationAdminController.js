const { query } = require('../config/database');

exports.listReservations = async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT reservation_id, customer_name, phone, email, reservation_date, reservation_time, number_of_guests, status, special_request, created_at
       FROM reservations ORDER BY created_at DESC`,
    );
    return res.json({ reservations: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch reservations' });
  }
};

exports.updateReservation = async (req, res) => {
  const { status } = req.body;
  try {
    await query('UPDATE reservations SET status = ? WHERE reservation_id = ?', [status, req.params.id]);
    return res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update reservation' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await query('DELETE FROM reservations WHERE reservation_id = ?', [req.params.id]);
    return res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete reservation' });
  }
};
