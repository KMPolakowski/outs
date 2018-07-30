         loadDashbord();
         loadUser();
         checkRequests();



         var amCaller;

         var pc;

         initPC();


         var lastIceState = 'stable';

         pc.oniceconnectionstatechange = function () {

             window.console.log("conn state: " + pc.iceConnectionState);

             if (pc.iceConnectionState == 'checking') {
                 setTimeout(function () {
                     window.console.log("after 1 sec: " + pc.iceConnectionState);

                     if (pc.iceConnectionState == 'checking' || pc.iceConnectionState == 'failed' || pc.iceConnectionState ==
                         'new') {
                         window.console.log("Dialing again");

                         initPC();

                         Dial();
                     }
                 }, 1000);
             } else if ((lastIceState == 'completed' || lastIceState == 'failed' || lastIceState == 'connected' ||
                     lastIceState == 'new') &&
                 pc.iceConnectionState == 'new') {
                 window.console.log('Dialing again');
                 Dial();

             } else if (pc.iceConnectionState == 'failed') {
                 window.console.log('Dialing again');
                 Dial();
             }

             lastIceState = pc.iceConnectionState;
             window.console.log('lastIceState: ' + lastIceState);
         }



         var callStarted;
         var chatFriendsId;
         var bell = document.getElementById("bellTone");
         var dial = document.getElementById("dialTone");
         var callingUser;
         $("#menu-toggle").click(function (e) {
             e.preventDefault();
             var className = $('#wrapper').attr('class');
             if (className != "toggled") {
                 $('#menu-toggle').text("<<");
             } else {
                 $('#menu-toggle').text(">>");
             }
             $("#wrapper").toggleClass("toggled");
         });

         var SignalingServer = {
             socket: null,
             Connect: function (cb) {
                 this.socket = io.connect("https://ec2-54-93-229-217.eu-central-1.compute.amazonaws.com:3000");
                 this.socket.on('callRequest', function (Id) {
                     callRequested(Id);
                 });
                 this.socket.on('chatMsg', function (msg, originUserId) {
                     if (originUserId == chatFriendsId) {
                         $("#msg-view").append(
                             "<ul class='list-group-left'><li class='list-group-item-left'>" + msg +
                             "</li> </ul>");
                         sound.play();
                         var scroll = document.getElementById('msg-view');
                         scroll.scrollTop = scroll.scrollHeight;
                     }
                 });
                 this.socket.on('msg', function (msg) {
                     if (msg == "callAccepted") {

                         amCaller = true;

                         Dial();
                         $("#circlewrapper").css("display", "block");
                         $("#dialNotif").toggle();
                         dial.pause();
                         callStarted = true;
                         $("#phone-btn").replaceWith(
                             "<img src='img/deny.png' id='hangUpBtn' class='person-thumbnail'>");
                         $("#hangUpBtn").click(function (e) {
                             hangUp();
                             $("#circlewrapper").css("display", "none");
                         });
                     }
                     if (msg == 'dialDenied') {
                         callStop();
                     }
                     if (msg == 'callDenied') {
                         dialStop();
                     }
                     if (msg == 'hangedUp') {
                         hangedUp();
                     }
                     cb(msg);
                 });
             },
             Send: function (msg) {
                 this.socket.emit('msg', msg);
             },
             Call: function () {
                 this.socket.emit('call', chatFriendsId, loggedUserId)
             },
             Subscribe: function (loggedUserId) {
                 this.socket.emit('subscribe', loggedUserId)
             },
             StoreClientId: function (loggedUSerId) {
                 this.socket.emit('storeClientId', loggedUSerId)
             },
             SendChatMsg: function (targetUserId, msg, originUserId) {
                 this.socket.emit('chatMsg', targetUserId, msg, originUserId)
             }
         }


         function hangedUp() {


             callStarted = false;
             $('#call-container').load('callView.html');

             if (amCaller) {
                 SignalingServer.Subscribe(loggedUserId);
             }

             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');

             initPC();

         }

         function initPC() {
             pc.close();

             pc = new RTCPeerConnection({
                 iceServers: [{
                         urls: "stun:stun.l.google.com:19302"
                     },
                     {
                         "urls": [
                             "turn:13.250.13.83:3478?transport=udp"
                         ],
                         "username": "YzYNCouZM1mhqhmseWk6",
                         "credential": "YzYNCouZM1mhqhmseWk6"
                     }
                 ]
             });
         }



         function hangUp() {


             callStarted = false;
             $('#call-container').load('callView.html');
             SignalingServer.Send('hangedUp');

             if (amCaller) {
                 SignalingServer.Subscribe(loggedUserId);
             }

             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');


             initPC();
         }




         function Dial() {

             pc.onicecandidate = function (event) {
                 if (event.candidate != null) SignalingServer.Send(event.candidate);
             };

             pc.onaddstream = function (event) {
                 // Deprecated, rlly?
                 document.getElementById("remvideo").srcObject = event.stream;
             };

             pc.createOffer().then(function (offer) {
                     return pc.setLocalDescription(offer);
                 })
                 .then(function () {
                     SignalingServer.Send(pc.localDescription);
                 })
                 .catch(function (reason) {
                     console.log(reason);
                 });


         }

         function Answer() {

             pc.createAnswer().then(function (answer) {
                     return pc.setLocalDescription(answer);
                 })
                 .then(function () {
                     SignalingServer.Send(pc.localDescription);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });

             pc.onaddstream = function (event) {
                 // Deprecated, rlly?
                 document.getElementById("remvideo").srcObject = event.stream;
             };

             pc.getStats(function (stats) {
                 console.log(stats.result())
             });

         }

         function onSignaling(msg) {
             if (msg.sdp) {
                 pc.setRemoteDescription(msg).then(function () {
                     window.console.log("setting rem desc: " + pc.remoteDescription);
                     if (msg.type == "offer") {
                         Answer();
                     }
                 });
             } else if (msg.candidate) {
                 pc.addIceCandidate(msg);
             }
             pc.getStats(function (stats) {
                 window.console.log(stats.result())
             });


         }

         $('#acceptCall').click(function () {

             amCaller = false;

             friendsName = $('#' + callingUser).text();
             chatFriendsId = callingUser;
             callStarted = true;
             $('#call-container').load('callView.html');

             SignalingServer.Send('callAccepted');
             $("#callNotif").toggle();
             bell.pause();
         });

         $('#denyCall').click(function () {
             $("#callNotif").toggle();
             bell.pause();
             SignalingServer.Send("callDenied");
             //SignalingServer.Subscribe(loggedUserId);
             $("#phone-btn").toggle();
             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');
         });



         $('#denyDial').click(function () {
             $("#dialNotif").toggle();
             $("#phone-btn").toggle();
             dial.pause();
             SignalingServer.Send("dialDenied");
             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');
             SignalingServer.Subscribe(loggedUserId);
         });

         function callRequested(Id) {
             callingUser = Id;
             $("#callNotif > h3").text($("#" + callingUser).text());
             $("#callNotif").toggle();
             $("#phone-btn").toggle();
             $('.sidebar-nav > li > a').css('pointer-events', 'none');
             bell.play();
         }

         function callStop() {
             $("#callNotif").toggle();
             $("#phone-btn").toggle();
             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');
             bell.pause();
         }

         function dialStop() {
             $("#dialNotif").toggle();
             $("#phone-btn").toggle();
             $('.sidebar-nav > li > a').css('pointer-events', 'inherit');
             dial.pause();
             SignalingServer.Subscribe(loggedUserId);
         }
         SignalingServer.Connect(onSignaling);
         SignalingServer.Subscribe(loggedUserId);
         SignalingServer.StoreClientId(loggedUserId);