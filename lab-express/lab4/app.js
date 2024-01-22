const express = require('express');

const app = express();

app.get('/sum', (req, res, next) => {
  // req.query; // { a: '2', b: '6', c: '[5, 7, 2]' } ==> ['2', '6']
  // Object.values(req.query); // ['2', '6', '[5, 7, 2]']
  const total = Object.values(req.query).reduce((acc, el) => {
    const parseEl = JSON.parse(el);
    if (Array.isArray(parseEl)) {
      acc += parseEl.reduce((innerAcc, innerEl) => innerAcc + innerEl, 0);
    } else {
      acc += parseEl;
    }
    return acc;
  }, 0);
  res.status(200).json({ sum: total });
});

app.listen(8014, () => {
  console.log('server running on port: 8014');
});
