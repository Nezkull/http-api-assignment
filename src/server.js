const http = require('http');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// look at status-code-example-done on class repo for stuff

// redo this part 
const urlStruct = {
    '/': htmlHandler.temp,
    '/success': htmlHandler.temp,
    '/badRequest': htmlHandler.temp,
    '/unauthorized': htmlHandler.temp,
    '/forbidden': htmlHandler.temp,
    '/internal': htmlHandler.temp,
    '/notImplemented': htmlHandler.temp
}

const onRequest = (request, response) => {
    console.log(request.url);
    
    /*
    switch(request.url) {
        case '/':
            break;
        case '/badRequest':
            break;
        case '/unauthorized':
            break;
        case '/forbidden':
            break;
        case 'internal':
            break;
        case 
    }
    */
}

// look at body-parse-example for css and stuff

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);