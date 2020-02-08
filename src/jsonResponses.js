const respondJSON = (request, response, status, obj) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(obj));
  response.end();
};

const respondXML = (request, response, status, obj) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  let responseXML = '<response>';

  responseXML = `${responseXML} <message>${obj.message}</message>`;
  if (obj.id) {
    responseXML = `${responseXML} <id>${obj.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;
  response.write(responseXML);
  response.end();
};

const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (type === 'application/json') {
    respondJSON(request, response, 200, responseJSON);
  } else {
    respondXML(request, response, 200, responseJSON);
  }
};

const badRequest = (request, response, param, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // check for valid query parameter
  if (!param.valid || param.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    if (type === 'application/json') {
      return respondJSON(request, response, 400, responseJSON);
    }
    return respondXML(request, response, 400, responseJSON);
  }

  if (type === 'application/json') {
    return respondJSON(request, response, 200, responseJSON);
  }
  return respondXML(request, response, 200, responseJSON);
};

const unauthorized = (request, response, param, type) => {
  const responseJSON = {
    message: 'This request has the required parameter',
  };

  if (!param.loggedIn || param.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';

    if (type === 'application/json') {
      return respondJSON(request, response, 401, responseJSON);
    }
    return respondXML(request, response, 401, responseJSON);
  }

  if (type === 'application/json') {
    return respondJSON(request, response, 200, responseJSON);
  }
  return respondXML(request, response, 200, responseJSON);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (type === 'application/json') {
    respondJSON(request, response, 403, responseJSON);
  } else {
    respondXML(request, response, 403, responseJSON);
  }
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };
  if (type === 'application/json') {
    respondJSON(request, response, 500, responseJSON);
  } else {
    respondXML(request, response, 500, responseJSON);
  }
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (type === 'application/json') {
    respondJSON(request, response, 501, responseJSON);
  } else {
    respondXML(request, response, 501, responseJSON);
  }
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  if (type === 'application/json') {
    respondJSON(request, response, 404, responseJSON);
  } else {
    respondXML(request, response, 404, responseJSON);
  }
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
