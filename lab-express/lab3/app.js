const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res, next) => {
  const pathname = path.join(__dirname, 'home.html');
  res.status(200).sendFile(pathname);
});

app.get('/login', (req, res, next) => {
  const pathname = path.join(__dirname, 'login.html');
  res.status(200).sendFile(pathname);
});

app.post('/submit-login', (req, res, next) => {
  res.status(200).redirect('/');
});

app.listen(8013, () => {
  console.log('server running on port: 8013');
});
