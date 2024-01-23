const express = require('express');

const errorHandler = require('./middlewares/error');
const notFoundHandler = require('./middlewares/404');
const authRouter = require('./routes/auth-route');
const billRouter = require('./routes/bill-route');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/bills', billRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8001, () => console.log('server running on port 8001'));
