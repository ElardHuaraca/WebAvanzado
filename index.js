const http = require('http');
const router = require('./source/router');
const validMethod = require('./source/validMethod');
const navidad = require('./source/navidad');
const edad = require('./source/edad');
http.createServer(function(request,response){
    router.route(request,response);
}).listen(9090);