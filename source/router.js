const fs = require('fs');
const navidad = require('./navidad');
const edad = require('./edad');
var data_post = '';
var data_split = [];
module.exports.route = function route(request, response) {
    const object = new URL(request.url, 'http://' + request.headers.host);
    let ref = 'dist' + object.pathname;
    if (ref === 'dist/index' || ref === 'dist/') {
        ref = 'dist/index.html';
    } else if (ref === 'dist/navidad') {
        response.writeHead(200, { 'Content-Type': 'text' });
        response.end(JSON.stringify({ 'navidad': navidad.navidad().toString() }));
        return
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
                        type = 'text/' + extencion[1];
                        break;
                }
                request.on('data', function (data_cortada) {
                    data_post += data_cortada;
                });
                content = content.toString();
                data_split = data_post.split('=');
                if (data_split.length > 0 & type === 'text/html') {
                    console.log(data_split);
                    for (let index = 0; index < data_split.length; index++) {
                        let age = edad.calculateAge(data_split[index+1]);
                        content = content.replace('{'+data_split[index]+'}', age);
                    }
                }
                response.writeHead(200, { 'Content-Type': type });
                response.end(content);
            } else {
                ref = 'pages/error.html';
                fs.readFile(ref, function (err, content) {
                    response.writeHead(404, { 'Content-Type': 'html' });
                    response.end(content);
                })
            }
        });
    });

}