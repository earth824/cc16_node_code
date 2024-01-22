const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'cc16_blog_post'
});

const createDatabase = () => {
  return pool.execute('CREATE DATABASE IF NOT EXISTS cc16_blog_post');
};

const createTablePost = () => {
  const sql = `CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(40) NOT NULL,
    title VARCHAR(191) NOT NULL,
    body TEXT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
  )`;
  return pool.execute(sql);
};

const createTableComment = () => {
  const sql = `CREATE TABLE IF NOT EXISTS comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commenter VARCHAR(191),
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    post_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
  )`;
  return pool.execute(sql);
};

const migrate = async () => {
  await createTablePost();
  await createTableComment();
};

const createPost = async obj => {
  // { author: 'John', title: 'Friday exam', body: 'Start: 9.00AM, End: 5.00PM' }
  const { author, title, body } = obj;
  const sql = `INSERT INTO posts (author, title, body) VALUES (?, ?, ?)`;
  const values = [author, title, body];
  await pool.execute(sql, values);
};

const updatePost = async (obj, postId) => {
  const { author, title, body } = obj;
  let updateValue = [];
  let subSql = [];
  if (author) {
    updateValue.push(author);
    subSql.push('author = ?');
  }
  if (title) {
    updateValue.push(title);
    subSql.push('title = ?');
  }
  if (body) {
    updateValue.push(body);
    subSql.push('body = ?');
  } // ['author = ?', 'title = ?', 'body = ?'] // subSql.join(', ') ====> author = ?, title = ?, body = ?
  const sql = `UPDATE posts SET ${subSql.join(', ')} WHERE id = ?`;
  await pool.execute(sql, [...updateValue, postId]);
};

const run = async () => {
  try {
    // createDatabase();
    // migrate();
    // await createPost({
    //   author: 'John',
    //   title: 'Friday exam',
    //   body: 'Start: 9.00AM, End: 5.00PM'
    // });
    await updatePost({ author: 'Ann' }, 1);
  } catch (err) {
    console.log(err);
  }
};

run();

// POST /register
// REQUEST BODY username: string required, password: string required at least 6 charactors
// Validate input ? success => : fail =>
// check username already exists ? exists => : not exists =>
// insert new users
// how to sent resposnse
