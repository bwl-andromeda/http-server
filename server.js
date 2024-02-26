const http = require('http');
const fs = require('fs');
const path = require('path');
let openPromise = import('open');

const PORT = 8080;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Expires': '0'
    });
    fs.createReadStream(path.resolve(__dirname, 'templates/index.html')).pipe(res);
});

server.listen(PORT, hostname, () => {
    console.log('Server started at http://' + hostname + ':' + PORT);
    let result_url = `http://${hostname}:${PORT}`;
    openPromise.then(module => {
        module.default(result_url);
    }).catch(error => {
        console.error('Error occurred while loading open module:', error);
    });
});
