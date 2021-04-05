const http = require('http');
const router = require('./router');

http.createServer(function(request,response) {
    router.route(request,response);
}).listen(9090);