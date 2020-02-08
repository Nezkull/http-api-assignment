const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// look at status-code-example-done on class repo for stuff

// redo this part
/*
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
  },
};
*/

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
      jsonHandler.unauthorized(request, response);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response);
      break;
    case '/internal':
      jsonHandler.internal(request, response);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response);
      break;
    default:
      jsonHandler.notFound(request, response);
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

// look at body-parse-example for css and stuff

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
