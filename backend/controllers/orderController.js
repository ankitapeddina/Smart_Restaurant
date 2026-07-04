const { query } = require('../models/db');

exports.placeOrder = async (req, res) => {
  const { items, subtotal, gst, reservation_discount, grand_total, payment_method, payment_status } = req.body;

  if (!Array.isArray(items) || items.length === 0 || !payment_method || !payment_status) {
    return res.status(400).json({ message: 'Complete order details are required' });
  }

  if (!Number.isFinite(subtotal) || !Number.isFinite(gst) || !Number.isFinite(reservation_discount) || !Number.isFinite(grand_total)) {
    return res.status(400).json({ message: 'Order amounts must be valid numbers' });
  }

  try {
    const [result] = await query(
      'INSERT INTO orders (user_id, subtotal, gst, reservation_discount, grand_total, payment_method, payment_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [req.user.id, subtotal, gst, reservation_discount, grand_total, payment_method, payment_status],
    );

    const orderId = result.insertId;
    const itemPromises = items.map((item) =>
      query('INSERT INTO order_items (order_id, menu_item, quantity, price, created_at) VALUES (?, ?, ?, ?, NOW())', [orderId, item.menu_item, item.quantity, item.price]),
    );

    await Promise.all(itemPromises);
    await query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    return res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to place order at this time' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const [orders] = await query('SELECT id, subtotal, gst, reservation_discount, grand_total, payment_method, payment_status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    return res.json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch orders' });
  }
};
