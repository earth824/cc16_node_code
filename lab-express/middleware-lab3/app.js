const express = require('express');
const axios = require('axios');

const app = express();

// https://dog.ceo/api/breeds/image/random
app.get('/dog', async (req, res, next) => {
  try {
    const axiosResponse = await axios.get(
      'https://dog.ceo/api/breeds/image/ran'
    );

    const dogImage = axiosResponse.data.message;
    res.send(`<img src="${dogImage}"/>`);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8023, 'localhost', () => {
  console.log('server is running on port: 8023');
});
