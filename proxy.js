var argv = require('optimist').demand(['h']).usage('Usage: $0 -h [host] -p [port], default port 8888').argv;

var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer();

var host = argv.h;

var port = argv.p || 8888;

http.createServer(function (req, res) {
  // This simulate an operation that take 500ms in execute
  setTimeout(function () {
    proxy.web(req, res, {
      target: 'http://'+host
    });
  }, 500);
}).listen(port);

