const http = require('http');
const router = require('./router');
const validMethod = require('./validMethod');

http.createServer(function(request,response) {
    validMethod.validMethod('GET','index',request,response);
    router.route(request,response);
}).listen(9090);