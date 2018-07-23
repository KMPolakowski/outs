/**
 * Created by Polakowski on 10.06.2018.
 */


var SignalingServer = {
    socket  : null,
    Connect : function (cb) {
        this.socket = io.connect("https://" + location.hostname + ":" + 81);

        this.socket.on('msg', function (msg) {  cb(msg);	});
    },
    Send    : function(msg) { this.socket.emit('msg',msg); }
};

SignalingServer.Connect(onSignaling);
var pc = new RTCPeerConnection({ iceServers: [
    { urls: "stun:stun.l.google.com:19302"},
    {
        "urls": [
            "turn:13.250.13.83:3478?transport=udp"
        ],
        "username": "YzYNCouZM1mhqhmseWk6",
        "credential": "YzYNCouZM1mhqhmseWk6"
    }
] });

pc.onicecandidate = function (event) {
    if (event.candidate != null) SignalingServer.Send(event.candidate);
};

pc.onaddstream = function (event) {

    // Deprecated, rlly?

    document.getElementById("remvideo").srcObject = event.stream;
};

$(document).ready(function() {

    navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    // Just add audio to stream audio too

    navigator.getUserMedia({ video: true, audio: true},
        function (stream) {
            //$("#locvideo").attr("src", window.URL.createObjectURL(stream));
            document.getElementById("locvideo").srcObject = stream;
            pc.addStream(stream);
        },
        function () { console.log("No Media"); }
    );

});


function Dial() {

    pc.createOffer().then(function(offer) {
        return pc.setLocalDescription(offer);
    })
        .then(function() {
            SignalingServer.Send(pc.localDescription);
            //window.console.log(pc.localDescription);
        })

        .catch(function(reason) {
            console.log(reason);
            // An error occurred, so handle the failure to connect
        });

};

function Answer()
{
    pc.createAnswer().then(function(answer) {
        return pc.setLocalDescription(answer);
    })
        .then(function() {
            SignalingServer.Send(pc.localDescription);
        })
        .catch(function(error)
        {
            console.log(error);
        });
}


function onSignaling(msg) {

    window.console.log("msg" + msg.type);



    if(msg.sdp)
    {
        pc.setRemoteDescription(msg).then(function()
        {
            if(msg.type == "offer")
            {
                Answer();
            }
        });

    }
    else if(msg.candidate)
    {
        window.console.log("GOT CANDIDATE MAN");
        pc.addIceCandidate(msg);
    }

}

