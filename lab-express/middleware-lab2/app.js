const express = require('express');

const app = express();

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: `${req.method.toUpperCase()} todos` });
});
router.post('/', (req, res, next) => {
  res.json({ message: `${req.method.toUpperCase()} todos` });
});
router.put('/:todoId', (req, res, next) => {
  res.json({ message: `${req.method.toUpperCase()} todos` });
});
router.patch('/:todoId', (req, res, next) => {
  res.json({ message: `${req.method.toUpperCase()} todos` });
});
router.delete('/:todoId', (req, res, next) => {
  res.json({ message: `${req.method.toUpperCase()} todos` });
});

app.use('/todos', router);

app.listen(8022, 'localhost', () => {
  console.log('server is running on port: 8022');
});
