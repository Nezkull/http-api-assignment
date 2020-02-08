const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl, param, types) => {
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      jsonHandler.success(request, response, types);
      break;
    case '/badRequest':
      jsonHandler.badRequest(request, response, param, types);
      break;
    case '/unauthorized':
      jsonHandler.unauthorized(request, response, param, types);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response, types);
      break;
    case '/internal':
      jsonHandler.internal(request, response, types);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response, types);
      break;
    default:
      jsonHandler.notFound(request, response, types);
      break;
  }
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedURL = url.parse(request.url);
  const param = query.parse(parsedURL.query);
  const type = request.headers.accept;

  console.dir(param);
  console.dir(type);


  if (request.method === 'POST') {
    handlePost(request, response, parsedURL);
  } else {
    handleGet(request, response, parsedURL, param, type);
  }
};


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
