var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '10.0.0.198');
console.log('Server running at http://10.0.0.198:1337/');
