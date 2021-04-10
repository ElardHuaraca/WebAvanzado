module.exports.validMethod = function validMethod(method, url, request, response) {
    if (("/" + url) === request.url) {
        if (method != request.method) {
            response.writeHead(405, { "Content-Type": "text/html" });
            response.end();
        }
    }
}