/**
 * Created by Polakowski on 29.04.2018.
 */
// id = selected friend


    $.ajax({
        type: "POST",
        url: 'bin/loadChat.php',
        dataType: 'json',
        data: {

            Sender: chatFriendsId,
            Recipient: loggedUserId

        },

        success: function (data) {

            var json = JSON.stringify(data);



            $("#friendChatLabel").html("<img src='img/user.png' id='con-person-img'  class='person-thumbnail'>" + friendsName);

            $.each(data, function (item) {
                if (data[item][0] == chatFriendsId) {
                    //Msg sent from other user to logged in user
                    $("#msg-view").append
                    ("<ul class='list-group-left'><li class='list-group-item-left'>" + data[item][3] + "</li> </ul>");
                }
                else {
                    // Msg sent from logged in user to other user
                    $("#msg-view").append
                    ("<ul class = 'list-group'><li class='list-group-item'>" + data[item][3] + "</li> </ul>");
                }

            });


            scroll.scrollTop = scroll.scrollHeight;

            //getNewMsg();

        },

        error: function (errMsg) {
            var json = JSON.stringify(errMsg);

            window.console.log(json);

        }


    });


function getNewMsg() {

        $.ajax({
            type: "POST",
            url: 'bin/awaitMsg.php',
            dataType: 'json',
            data: {
                Friend: chatFriendsId,
                User: loggedUserId
            },
            success: function (data) {


                    $("#msg-view").append
                    ("<ul class='list-group-left'><li class='list-group-item-left'>" + data[2] + "</li> </ul>");

                    scroll.scrollTop = scroll.scrollHeight;

                    sound.play();

                    startAgain();

            },
            error: function (errMsg) {
                var json = JSON.stringify(errMsg);

                window.console.log(json);
            }


        });

    }

    function startAgain()
    {
        getNewMsg();
    }



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function waitForMsg() {


    getNewMsg();
    await sleep(2000);

}
