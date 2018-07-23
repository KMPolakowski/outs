/**
 * Created by Polakowski on 22.05.2018.
 */

function onUserMediaSuccess(stream) {
    console.log("User has granted access to local media.");
    // Call the polyfill wrapper to attach the media stream to this element.


    // Caller creates PeerConnection.
    if (initiator) maybeStart();
}

function maybeStart() {
    if (!started && localStream && channelReady) {
        // ...
        createPeerConnection();
        // ...
        pc.addStream(localStream);
        started = true;
        // Caller initiates offer to peer.

        var initiator = true;
        if (initiator)
            doCall();
    }
}

function createPeerConnection() {
    var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    try {
        // Create an RTCPeerConnection via the polyfill (adapter.js).
        pc = new RTCPeerConnection(pc_config);
        pc.onicecandidate = onIceCandidate;
        console.log("Created RTCPeerConnnection with config:\n" + "  \"" +
            JSON.stringify(pc_config) + "\".");
    } catch (e) {
        console.log("Failed to create PeerConnection, exception: " + e.message);
        alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
        return;
    }

    pc.onconnecting = onSessionConnecting;
    pc.onopen = onSessionOpened;
    pc.onaddstream = onRemoteStreamAdded;
    pc.onremovestream = onRemoteStreamRemoved;
}


function onRemoteStreamAdded(event) {
    // ...
    miniVideo.src = localVideo.src;
    attachMediaStream(remoteVideo, event.stream);
    remoteStream = event.stream;
    waitForRemoteVideo();
}

function doCall() {
    console.log("Sending offer to peer.");
    pc.createOffer(setLocalAndSendMessage, null, mediaConstraints);
}

function doAnswer() {
    console.log("Sending answer to peer.");
    pc.createAnswer(setLocalAndSendMessage, null, mediaConstraints);
}


function setLocalAndSendMessage(sessionDescription) {
    // Set Opus as the preferred codec in SDP if Opus is present.
    sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
}

function onIceCandidate(event) {
    if (event.candidate) {
        sendMessage({type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate});
    } else {
        console.log("End of candidates.");
    }
}

function sendMessage(message) {
    var msgString = JSON.stringify(message);
    console.log('C->S: ' + msgString);

    socket.emit('message', msgString);

}


function processSignalingMessage(message) {

    console.log("Got Message " + message);

    var msg = JSON.parse(message);

    if (msg.type === 'offer') {
        // Callee creates PeerConnection
        if (!initiator && !started)
            maybeStart();

        pc.setRemoteDescription(new RTCSessionDescription(msg));
        doAnswer();
    } else if (msg.type === 'answer' && started) {
        pc.setRemoteDescription(new RTCSessionDescription(msg));
    } else if (msg.type === 'candidate' && started) {
        var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label,
            candidate:msg.candidate});
        pc.addIceCandidate(candidate);
    } else if (msg.type === 'bye' && started) {
        onRemoteHangup();
    }
}


