const express = require('express');
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({ log: ['query'] });

const registerSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email({ tlds: false }),
  mobile: Joi.string().pattern(/^[0-9]{10}$/),
  password: Joi.string().required()
}).xor('email', 'mobile', 'username');

const loginSchema = Joi.object({
  password: Joi.string().required(),
  emailOrMobileOrUsername: Joi.string().required()
});

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 10);
    await prisma.user.create({
      data: value
    });
    res.status(201).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      return next(error);
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: value.emailOrMobileOrUsername },
          { email: value.emailOrMobileOrUsername },
          { mobile: value.emailOrMobileOrUsername }
        ]
      }
    });

    if (!user) {
      const error = new Error('invalid credentials');
      error.statusCode = 400;
      return error;
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      const error = new Error('invalid credentials');
      error.statusCode = 400;
      return error;
    }

    delete user.password;
    const token = jwt.sign(user, '1q2w3e4r5t6y7u8i9o0p', { expiresIn: '30d' });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

const PORT = 9999;
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
