const { query } = require('../models/db');

exports.getDashboard = async (req, res) => {
  try {
    const [[summary]] = await query(
      `SELECT
        COUNT(o.id) AS total_orders,
        COALESCE(SUM(o.grand_total), 0) AS total_amount_spent,
        COUNT(DISTINCT r.id) AS reservation_count
      FROM orders o
      LEFT JOIN reservations r ON r.user_id = o.user_id
      WHERE o.user_id = ?`,
      [req.user.id],
    );

    const [cartItems] = await query('SELECT id, menu_item, quantity, price FROM cart WHERE user_id = ?', [req.user.id]);
    const [reservations] = await query('SELECT id, reservation_date, reservation_time, people_count, special_request, created_at FROM reservations WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    const [orders] = await query('SELECT id, subtotal, gst, reservation_discount, grand_total, payment_status, payment_method, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);

    return res.json({
      summary: {
        totalOrders: Number(summary.total_orders || 0),
        totalAmountSpent: Number(summary.total_amount_spent || 0),
        reservationCount: Number(summary.reservation_count || 0),
      },
      cartItems,
      reservations,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch dashboard data' });
  }
};
