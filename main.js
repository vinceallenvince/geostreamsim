var pjson = require('./package.json');
var httpPort = 3000;

var express = require('express'),
	http = require('http');

// HTTP SERVER
var app = express();

app.use(express.static(__dirname + '/public'));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(httpPort, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('%s listening at http://%s:%s', pjson.name, host, port);
});


// SOCKET.IO
io.on('connection', function(socket) {
	socket.emit('log', 'connected to server');
})

var Streamer = require("./src/streamer");
var streamer = new Streamer(io, 30);
streamer.start();
