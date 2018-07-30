var fs = require("fs");
var http = require("https");
var express = require("express");
var io = require("socket.io");


// setup https express WebServer and WebSocket Server
var app = express();
var webServer = http.createServer({
    key: fs.readFileSync("/etc/pki/tls/private/localhost.key"),
    cert: fs.readFileSync("/etc/pki/tls/certs/localhost.crt"),
    rejectUnauthorized: false
}, app).listen(3000);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var SocketServer = io.listen(webServer);


var room;

var clients = [];

SocketServer.on('connection', function (socket) {

    socket.on('storeClientId', function (customId) {

        var clientInfo = new Object();
        clientInfo.customId = customId;
        clientInfo.socketId = socket.id;
        clients.push(clientInfo);
        console.log('New client available');
    });

    socket.on('disconnect', function (data) {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];

            if (c.socketId == socket.id) {
                clients.splice(i, 1);
                break;
            }
        }
    });

    socket.on('chatMsg', function (targetUserId, msg, originUserId) {
        var targetSocket;

        for (var i = 0; i < clients.length; ++i) {

            if (clients[i].customId == targetUserId) {
                targetSocket = clients[i];
            }
        }

        if (typeof targetSocket !== 'undefined') {
            socket.to(targetSocket.socketId).emit('chatMsg', msg, originUserId);
        }
    });



    socket.on('subscribe', function (room) {

        socket.leave(this.room);
        console.log(socket.id + 'leaving room' + this.room);
        this.room = room;
        console.log(socket.id + 'joining room:', this.room);
        console.log('socket id: ' + socket.id);


        socket.join(this.room);

    });


    socket.on('msg', function (msg) {

        console.log(msg);
        socket.to(this.room).emit('msg', msg);
    });

    socket.on('call', function (friend, user) {
        socket.join(friend);
        this.room = friend;
        socket.to(friend).emit('callRequest', user);


        console.log(user + " calling " + friend);

    });



});