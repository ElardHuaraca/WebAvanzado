const http = require('http');
const router = require('./router');
const validMethod = require('./validMethod');

http.createServer(function (request, response) {
    validMethod.validMethod('POST', 'confirmacion.html', request, response);
    router.route(request, response);
}).listen(9090);