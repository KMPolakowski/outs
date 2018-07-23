
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var attachMediaStream = require('attachmediastream');


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket){
    socket.on('message', function(msg){
        io.emit('message', msg);
    });

});

http.listen(81, function(){
    console.log('listening on *:81');
});







