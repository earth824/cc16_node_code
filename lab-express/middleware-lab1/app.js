const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'path not found on this server' });
});

// PORT Number 0 - 65536
// Well Known Port 0 - 1024
app.listen(8021, () => console.log('server running on port: 8021'));
