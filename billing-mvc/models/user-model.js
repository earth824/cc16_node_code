const db = require('../db');

const getUserByUsername = async username => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  const values = [username];
  const row = await db.execute(sql, values);
  return row.length > 0 ? row[0] : null;
};

const createUser = async userObj => {
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  const values = [userObj.username, userObj.password];
  return db.execute(sql, values);
};

module.exports = {
  getUserByUsername,
  createUser
};
