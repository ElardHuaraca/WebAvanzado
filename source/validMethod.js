const router = require('./router');
module.exports.validMethod = function validMethod(method, url, request, response) {
    var url2 = request.url.split('?');
    if (("/" + url) === url2[0]) {
        if (method != request.method) {
            response.writeHead(405, { "Content-Type": "text/html" });
            response.end();
            return
        }
    }
}