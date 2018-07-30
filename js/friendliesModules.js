/**
 * Created by Polakowski on 25.06.2018.
 */


var typingTimer;
var doneTypingInterval = 400;
var $input = $('#search-input');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);

    if ($input.val() == "") {
        loadDashbord();
    }
});

//on keydown, clear the countdown
$input.on('keydown', function () {
    clearTimeout(typingTimer);
    $("#friends").empty();
});

//user is "finished typing," do something
function doneTyping() {


    var input = $("#search-input").val();

    if (input != "" & jQuery.trim(input).length != 0) {


        $.ajax({
            type: "POST",
            url: 'bin/peopleSearch.php',
            dataType: 'json',
            data: {

                Input: input,
                User: loggedUserId

            },

            success: function (data) {

                var json = JSON.stringify(data);

                window.console.log(json);

                $.each(data, function (item) {
                    $("#friends").append("<li> <a  href='#' class='friend_li'> <img src='img/user.png'  class='person-thumbnail'>" + " " + data[item][1] + " " + data[item][2] + " <img src='img/adduser.png'  id='" + data[item][0] + "'  class='addFriendBtn'> </a> </li>");

                    $("#" + data[item][0]).click(function (e) {

                        //window.alert($(this).attr('id'));
                        requestFriend(data[item][0]);

                    });
                });






            },
            error: function (errMsg) {
                var json = JSON.stringify(errMsg);

                window.console.log(json);

            }


        });

    }

    function requestFriend(friendsId) {
        $.ajax({
            type: "POST",
            url: 'bin/requestFriend.php',
            dataType: 'json',
            data: {

                RequestingUser: loggedUserId,
                RequestedUser: friendsId

            },

            success: function (data) {

                var json = JSON.stringify(data);
                window.console.log(json);

                if (json == 'true') {
                    window.alert("Friend requested for friendship!");
                } else if (json == 'false') {
                    window.alert("You already requested this user");
                }


            },
            error: function (errMsg) {
                var json = JSON.stringify(errMsg);

                window.console.log(json);

            }


        });
    }

}

function executeDecision(accepted, requestingUser, request) {
    $.ajax({
        type: "POST",
        url: 'bin/addFriendlie.php',
        dataType: 'json',
        data: {

            RequestedUser: loggedUserId,
            RequestingUser: requestingUser,
            Decision: accepted,
            RequestId: request

        },

        success: function (data) {

            var json = JSON.stringify(data);

            window.console.log(json);

        },
        error: function (errMsg) {
            var json = JSON.stringify(errMsg);

            window.console.log(json);

        }


    });
}



function checkRequests() {

    $.ajax({
        type: "POST",
        url: 'bin/checkRequests.php',
        dataType: 'json',
        data: {

            RequestedUser: loggedUserId

        },

        success: function (data) {

            var json = JSON.stringify(data);
            window.console.log(json);

            $.each(data, function (item) {
                if (confirm("Do you want to become friendlie of " + data[item][0] + " " + data[item][1] + "?")) {

                    executeDecision(true, data[item][2], data[item][3]);


                    window.location.reload();

                } else {
                    executeDecision(false, data[item][2], data[item][3]);
                }
            });




        },
        error: function (errMsg) {
            var json = JSON.stringify(errMsg);

            window.console.log(json);

        }


    });
}