/**
 * Created by Polakowski on 29.04.2018.
 */


function sendMsg(msg)
{


    $.ajax({
        type: "POST",
        url: 'bin/sendMsg.php',
        dataType: 'json',
        data: {

            Msg: msg,
            Sender: loggedUserId,
            Recipient: chatFriendsId

        },

        success: function (data) {


            var json = JSON.stringify(data);

            window.console.log(json);

            if(data == 1)
            {
                $("#msg-view").append
                ("<ul class = 'list-group'><li class='list-group-item'>" + msg + "</li> </ul>");

                scroll.scrollTop = scroll.scrollHeight;

            }
            else
            {
                window.alert("Ups! Something went wrong")
            }


        },
        error: function (errMsg)
        {
            var json = JSON.stringify(errMsg);

            window.console.log(json);
        }



    });
};


