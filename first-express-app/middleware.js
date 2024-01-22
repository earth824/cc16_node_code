const express = require('express');

const app = express();

// /todo
// app.get('/todo', (req, res, next) => {}); // GET ALL TODO
// app.get('/todo/:todoId', (req, res, next) => {}); // GET TODO BY todoId
// app.post('/todo', (req, res, next) => {}); // CREATE TODO
// app.put('/todo/:todoId', (req, res, next) => {}); // UPDATE TODO by todoId
// app.patch('/todo/:todoId', (req, res, next) => {}); // UPDATE partial TODO by todoId
// app.delete('/todo/:todoId', (req, res, next) => {}); // DELETE TODO by todoId

// const router = express.Router();
// router.get('/', (req, res, next) => {}); // GET ALL TODO       GET /todo
// router.get('/:todoId', (req, res, next) => {}); // GET TODO BY todoId      GET /todo/:todoId
// router.post('/', (req, res, next) => {}); // CREATE TODO
// router.put('/:todoId', (req, res, next) => {}); // UPDATE TODO by todoId
// router.patch('/:todoId', (req, res, next) => {}); // UPDATE partial TODO by todoId
// router.delete('/:todoId', (req, res, next) => {}); // DELETE TODO by todoId
// app.use('/todo', router);

app.use((req, res, next) => {
  req.abcd = 'request object has been modified';
  console.log('Middleware #1 executed');
  // JSON.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  next('jfjfjfjfjfjfjfjfjfjf');
});

// app.use('/', mid1, mid2)
app.use(
  '/aaaaaaaaaaaaaaa',
  (req, res, next) => {
    console.log('Middleware GET / executed');
    next();
  },
  (req, res, next) => {
    console.log('Middleware GET / #2 executed');
    res.end();
  }
);

app.use(async (req, res, next) => {
  console.log(req.abcd);
  console.log('Last Middleware executed');
});

app.use((err, req, res, next) => {
  console.log('Error Middleware');
  next();
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(8002, () => {
  console.log('server running on port: 8002');
});
