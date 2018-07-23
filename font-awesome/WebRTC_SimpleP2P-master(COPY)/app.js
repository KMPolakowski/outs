var fs      = require("fs");
var https   = require("https");
var express = require("express");
var io      = require("socket.io");

// setup https express WebServer and WebSocket Server
var app = express();
var webServer = https.createServer(
    {
        key  : fs.readFileSync("server.key"),
        cert : fs.readFileSync("server.crt")
    }, app).listen(81);

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

app.use(express.static(__dirname + "/static/"));




var SocketServer = io.listen(webServer);

    var PeerASockIO = null, PeerBSockIO = null;

    SocketServer.on('connection', function (socket) {
        console.log("connected");

    if ((PeerASockIO != null) && (PeerBSockIO != null)) return;    
    if (PeerASockIO == null) PeerASockIO = socket; else PeerBSockIO = socket;		
    
    socket.on('disconnect', function () {
        if (socket == PeerASockIO) PeerASockIO = null;
        if (socket == PeerBSockIO) PeerBSockIO = null;
    });
    
    socket.on('msg', function (msg) {

        if ((PeerASockIO == null) || (PeerBSockIO == null)) return;

        var remSock = PeerBSockIO;
        if (socket == PeerBSockIO) remSock = PeerASockIO;

        remSock.emit('msg', msg);	
    });

});