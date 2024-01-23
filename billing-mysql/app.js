const express = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'cc16_billing'
});

const app = express();

app.use(express.json());

const authRoute = express.Router();
authRoute.post('/register', async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'username is required' });
    }

    const sql = `SELECT username FROM users WHERE username = ?`;
    const values = [username];
    const [row] = await pool.execute(sql, values);
    if (row.length > 0) {
      return res.status(400).json({ message: 'username already in use' });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: 'password is required' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'password and confirm password did not match' });
    }

    const sql1 = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const values1 = [username, password];
    await pool.execute(sql1, values1);

    res.status(201).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});
authRoute.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'username is required' });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: 'password is required' });
    }

    const sql = `SELECT username FROM users WHERE username = ? AND password = ?`;
    const values = [username, password];
    const [row] = await pool.execute(sql, values);

    if (row.length === 0) {
      return res.status(400).json({ message: 'invalid username or password' });
    }

    res.status(200).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});
authRoute.patch('/change-password', async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'username is required' });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: 'password is required' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'password and confirm password did not match' });
    }

    const sql = `SELECT username FROM users WHERE username = ?`;
    const values = [username];
    const [row] = await pool.execute(sql, values);

    if (row.length === 0) {
      return res.status(400).json({ message: 'user not found' });
    }

    const sql1 = `UPDATE users SET password = ? WHERE username = ?`;
    const values1 = [password, username];
    await pool.execute(sql1, values1);

    res.status(200).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

app.use('/auth', authRoute);

const billRoute = express.Router();

// const mapKeyToCol = {
//   firstName: 'first_name',
//   lastName: 'last_name'
// }
// Object.keys(req.body).map(el => mapKeyToCol[el]).join(',)

billRoute.post('/add-bill', async (req, res, next) => {
  try {
    const sql = `INSERT INTO bills (${Object.keys(req.body).join(
      ','
    )}) VALUES (${Object.keys(req.body)
      .map(el => '?')
      .join(',')})`; // (?,?,?,?,?,?)

    const values = Object.values(req.body);

    await pool.execute(sql, values);
    res.status(201).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

billRoute.patch('/update-bill/:billId', async (req, res, next) => {
  try {
    const { billId } = req.params;
    const sql = `UPDATE bills SET ${Object.keys(req.body)
      .map(el => `${el} = ?`)
      .join(',')} WHERE id = ?`; // [first_name, last_name].map ===> [first_name = ?, last_name = ?].join ===> first_name = ?, last_name = ?
    const values = [...Object.values(req.body), billId];
    await pool.execute(sql, values);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

billRoute.delete('/remove-bill/:billId', async (req, res, next) => {
  try {
    const sql = 'DELETE FROM bills WHERE id = ?';
    const values = [req.params.billId];
    await pool.execute(sql, values);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

billRoute.get('/search', async (req, res, next) => {
  try {
    // req.query ===> { user_id: 1, first_name: jim, is_paid: true }
    // ===> [user_id, first_name, last_name].map ===>  [user_id = ?, first_name = ?, last_name = ?].join ===> user_id = ? AND first_name = ? AND is_paid = ?
    const queryKey = Object.keys(req.query);
    const whereCond =
      queryKey.length === 0
        ? ''
        : ` WHERE ${queryKey.map(el => `${el} = ?`).join(' AND ')}`;
    const sql = `SELECT * FROM bills${whereCond}`;
    const values = Object.values(req.query);
    const [row] = await pool.execute(sql, values);
    res.status(200).json({ count: row.length, billData: row });
  } catch (err) {
    next(err);
  }
});

app.use('/bills', billRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8000, () => {
  console.log('server running on port 8000');
});
