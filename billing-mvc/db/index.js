const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'cc16_billing'
});

const execute = async (sql, values) => {
  const [result] = await pool.execute(sql, values);
  return result;
};

module.exports = {
  pool,
  execute
};
