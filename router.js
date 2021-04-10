const fs = require('fs');
module.exports.route = function route(request, response) {
    const object = new URL(request.url, 'http://' + request.headers.host);
    let ref = 'pages' + object.pathname;
    if (ref === 'pages/index' || ref=== 'pages/') {
        ref = 'pages/index.html';
    }
    fs.stat(ref, fail => {
        fs.readFile(ref, function (err, content) {
            var extencion = ref.split('.');
            var type = '';
            if (err == null) {
                switch (extencion.length) {
                    case 3:
                        type = 'text/' + extencion[2];
                        break;
                    default:
                        type = 'text/'+extencion[1];
                        break;
                }
                response.writeHead(200, { 'Content-Type': type });
                response.end(content);
            } else {
                response.writeHead(404, { 'Content-Type': 'html' });
                response.end('pages/error');
            }
        })
    });
}