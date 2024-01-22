const http = require('http');

const resBody = { message: 'This is a json response' };

const requestListener = (req, res) => {
  // res.setHeader('Content-type', 'application/json');
  // res.writeHead(200);
  // res.end(JSON.stringify(resBody));
  const resource = req.url;
  const method = req.method;
  res.setHeader('Content-type', 'text/html');

  switch (resource) {
    case '/book':
      switch (method) {
        case 'GET':
          res.writeHead(200);
          res.end('<h1 style="color: red">Welcome to Book Page</h1>');
          break;
        case 'POST':
          res.writeHead(200);
          res.end('<h1 style="color: red">Welcome to Book Page</h1>');
          break;
        case 'DELETE':
          res.writeHead(200);
          res.end('<h1 style="color: red">Welcome to Book Page</h1>');
          break;
        default:
          res.writeHead(200);
          res.end('<h1 style="color: red">Welcome to Book Page</h1>');
          break;
      }
    case '/product':
      res.writeHead(200);
      res.end('<h1 style="color: red">Welcome to Product Page</h1>');
      break;
    default:
      res.writeHead(404);
      res.end('<h1 style="color: red">Page not found</h1>');
  }
};

const server = http.createServer(requestListener);
server.listen(8000, 'localhost', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('server is running on port: 8000');
  }
});
