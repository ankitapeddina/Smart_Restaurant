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

const query = async (sql, params) => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`USE \`${databaseName}\``);
    return connection.query(sql, params);
  } finally {
    connection.release();
  }
};

module.exports = { query, pool };
