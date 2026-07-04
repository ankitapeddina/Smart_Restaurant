const mysql = require('mysql2/promise');

const databaseName = process.env.DB_NAME || 'smart_restaurant';
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const query = async (sql, params = []) => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`USE \`${databaseName}\``);
    const [rows] = await connection.query(sql, params);
    return [rows];
  } catch (error) {
    console.error('[DB] Query failed:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

const testConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    return { connected: true, result: rows[0] };
  } catch (error) {
    console.error('[DB] Connection failed:', error.message);
    return { connected: false, error: error.message };
  }
};

module.exports = { query, pool, testConnection };
