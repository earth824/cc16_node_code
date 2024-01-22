const mysql = require('mysql2/promise');

const run = async () => {
  try {
    // const connection = await mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: '123456',
    //   database: 'cc16_node_mysql'
    // });

    // const result = await connection.query(
    //   'CREATE DATABASE IF NOT EXISTS cc16_node_mysql'
    // );

    // const result = await connection.query(
    //   `CREATE TABLE IF NOT EXISTS continents (
    //       id INT PRIMARY KEY AUTO_INCREMENT,
    //       name VARCHAR(40) NOT NULL UNIQUE
    //     )`
    // );

    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'ecommerce',
      connectionLimit: 5
    });

    // const result = await pool.execute(
    //   'INSERT INTO continents (name) VALUES ("Asia")'
    // );

    // const [result, fields] = await pool.execute(
    //   'UPDATE continents SET name = "Europe" WHERE id = 1'
    // );

    // const [result, fields] = await pool.execute(
    //   'DELETE FROM continents WHERE id = 1'
    // );

    // console.log(result);
    // console.log(fields);

    // const [row, fields] = await pool.execute('SELECT * FROM customers');
    // console.log(row);
    // console.log('******************************************************');
    // console.log(fields);

    // Data sent from fORM sUBMIT eg. email = 'a@gmail.com', password: '123456' (req.body)
    // SELECT * FROM users WHERE email = 'a@gmail.com' AND password = '123456'
    const email = 'a@gmail.com" OR "1" = "1'; // const email = req.body.email
    const password = '123456" OR "1" = "1';

    // const sql =
    //   'SELECT * FROM customers WHERE name = "' +
    //   email +
    //   '" AND address = "' +
    //   password +
    //   '"';
    // console.log(sql);

    const sql = 'SELECT * FROM customers WHERE name = ? AND address = ?';

    const [row] = await pool.execute(sql, [
      'a@gmail.com" OR "1" = "1',
      '123456" OR "1" = "1'
    ]);
    console.log(row);
  } catch (err) {
    console.log(err);
  }
};

run();
