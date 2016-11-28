var http = require('http');
var controller = require('./server/controller.js');
var server = http.createServer(controller);

server.listen(8080);