const { query } = require('../config/database');

exports.listOrders = async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT order_id, customer_id, customer_name, order_items, total_amount, payment_method, payment_status, order_status, created_at
       FROM orders ORDER BY created_at DESC`,
    );
    return res.json({ orders: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch orders' });
  }
};

exports.updateOrder = async (req, res) => {
  const { order_status } = req.body;
  try {
    await query('UPDATE orders SET order_status = ? WHERE order_id = ?', [order_status, req.params.id]);
    return res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await query('DELETE FROM orders WHERE order_id = ?', [req.params.id]);
    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete order' });
  }
};
