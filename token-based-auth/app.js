const express = require('express');
const jwt = require('jsonwebtoken');

const secret = '1q2w3e4r5t6y7u8i9o0p';

const app = express();

app.use(express.json());

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (username !== 'admin' && password !== '123456') {
    return res.status(400).json({ message: 'login failed' });
  }
  const payload = {
    username: 'admin'
  };
  const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
  res.status(200).json({ token });
});

const verifyToken = (req, res, next) => {
  // Bearer
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: 'unauthenticated' });
  }
  const [bearer, token] = authorization.split(' '); // 1 whitespace ===> ['Bearer', JWT]
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'unauthenticated' });
  }

  try {
    const decodePayload = jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ message: 'unauthenticated' });
  }
};

app.get('/secure-item', verifyToken, (req, res, next) => {
  res.status(200).json({ message: 'you got secure item' });
});

app.post('/orders', verifyToken, (req, res, next) => {
  // create order here
});

app.listen(8000, () => console.log('server running on port 8000'));
