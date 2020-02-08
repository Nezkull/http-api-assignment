const respondJSON = (request, response, status, obj) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(obj));
  response.end();
};
/*
const respondXML = (request, response, status, obj) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(obj);
  response.end();
};
*/

/*
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};
*/
/*
const responses = (request, response, page, type) => {
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    switch(page){
        case '/success':
            if()
            break;
        case 'badRequest':
            break;
        case 'unauthorized':
            break;
        case 'forbidden':
            break;
        case 'internal':
            break;
        case 'notImplemented':
            break;

    }
}
*/
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// might not need meta for everything, also might do need
/*
const successMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};
*/

const badRequest = (request, response, param) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // check for valid query parameter
  if (!param.valid || param.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, param) => {
  const responseJSON = {
    message: 'This request has the required parameter',
  };

  if (!param.loggedIn || param.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
