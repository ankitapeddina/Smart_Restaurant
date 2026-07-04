const { query } = require('../config/database');

exports.getReports = async (req, res) => {
  try {
    const [dailySales] = await query("SELECT DATE(created_at) AS label, COALESCE(SUM(total_amount), 0) AS value FROM orders WHERE payment_status = 'Paid' GROUP BY DATE(created_at) ORDER BY DATE(created_at) DESC LIMIT 7");
    const [weeklySales] = await query("SELECT DATE_FORMAT(created_at, '%Y-%u') AS label, COALESCE(SUM(total_amount), 0) AS value FROM orders WHERE payment_status = 'Paid' GROUP BY DATE_FORMAT(created_at, '%Y-%u') ORDER BY label DESC LIMIT 6");
    const [monthlySales] = await query("SELECT DATE_FORMAT(created_at, '%Y-%m') AS label, COALESCE(SUM(total_amount), 0) AS value FROM orders WHERE payment_status = 'Paid' GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY label DESC LIMIT 6");
    const [reservationReports] = await query("SELECT status AS label, COUNT(*) AS value FROM reservations GROUP BY status");
    const [topSellingFoods] = await query("SELECT JSON_EXTRACT(order_items, '$[*].name') AS label, COUNT(*) AS value FROM orders GROUP BY JSON_EXTRACT(order_items, '$[*].name')");
    const [customerStats] = await query("SELECT COUNT(*) AS total_customers FROM customers");

    return res.json({ dailySales, weeklySales, monthlySales, reservationReports, topSellingFoods, customerStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to load reports' });
  }
};
