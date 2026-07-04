const { query } = require('../config/database');

exports.listCustomers = async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT c.customer_id, c.full_name, c.email, c.phone, c.created_at, COUNT(o.order_id) AS total_orders
       FROM customers c
       LEFT JOIN orders o ON o.customer_id = c.customer_id
       GROUP BY c.customer_id
       ORDER BY c.created_at DESC`,
    );
    return res.json({ customers: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch customers' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await query('DELETE FROM customers WHERE customer_id = ?', [req.params.id]);
    return res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete customer' });
  }
};
