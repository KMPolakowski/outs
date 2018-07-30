$('#msg-view').height($(this).height() - 150);
$(window).on('resize', function () {
    $('#msg-view').height($(this).height() - 150);
});

if (callStarted) {
    $("#phone-btn").replaceWith("<img src='img/deny.png' id='hangUpBtn' class='person-thumbnail'>");
    $("#circlewrapper").css("display", "block");


    $("#hangUpBtn").click(function (e) {

        callStarted = false;

        $('#call-container').load('callView.html');

        SignalingServer.Send('hangedUp');

        SignalingServer.Subscribe(loggedUserId);
        SignalingServer.Subscribe(loggedUserId);
    });


}



var scroll = document.getElementById('msg-view');


var sound = document.getElementById("audio");

var friendsName;




$("#message-input").keydown(function (event) {

    var input = escape($("#message-input").val());

    if (event.which == 13) {


        if (input != "" & jQuery.trim(input).length != 0) {

            SignalingServer.SendChatMsg(chatFriendsId, input, loggedUserId);
            $("#msg-view").append("<ul class = 'list-group'><li class='list-group-item'>" + input +
                "</li> </ul>");
            $("#message-input").val("");
            scroll.scrollTop = scroll.scrollHeight;

        }

    }

});

function escape(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(
        /'/g, '&#x27;').replace('/', '&#x2F;');

}


navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

// Just add audio to stream audio too

navigator.getUserMedia({
        video: true,
        audio: true
    },
    function (stream) {
        document.getElementById("locvideo").srcObject = stream;

        if (pc.signalingState !== 'closed') {
            pc.addStream(stream);
        } else {
            window.console.log('cant add stream -> signal state closed')
        }
    },
    function () {
        console.log("No Media");
    }
);




function preDial() {
    SignalingServer.Call();

}





$("#phone-btn").click(function (e) {

    preDial();

    dial.play();

    $("#dialNotif > h3").text($("#" + chatFriendsId).text());
    $('.sidebar-nav > li > a').css('pointer-events', 'none');

    $("#dialNotif").toggle();
    $("#phone-btn").toggle();

});