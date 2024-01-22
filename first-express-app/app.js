const express = require('express');

const app = express();

// http://localhost:8001/about2.jpg
// app.use(express.static('public'));

// http://localhost:8001/assets/images/about2.jpg
// http://localhost:8001/assets/css/main.css
app.use('/static', express.static('public'));

// POST /aaa
app.get('/', (req, res, next) => {
  console.log(req.query);
  res.status(200).end('<h1>Welcome to my Express Server</h1>');
});

app.post('/book/:bookName/chaptor/:chaptorNum', (req, res, next) => {
  console.log(req.params);
  res.status(400).send({ message: 'Post Book Name: ' + req.params.bookName });
});

app.use(express.json()); // Content-type: application/json ? (req,res,next) => { // parsing request body next() }
app.use(express.urlencoded({ extended: false })); // Content-type: x-www-form-urlencode ? (req,res,next) => { // parsing request body next() }
app.put('/car', (req, res, next) => {
  console.log(req.body);
  console.log(typeof req.body);
  res.status(503).send('5');
});

app.listen(8001, 'localhost', () => {
  console.log('server is running on port: 8001');
});
