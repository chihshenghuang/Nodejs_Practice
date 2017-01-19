var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
app.get('/', function(request, response){
	response.end('hello world!');
});

server.listen(3333, function(){
	console.log('HTTP server is running on http://127.0.0.1:8080 for host');
});

