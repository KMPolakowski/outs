var email = Cookies.get("Email");


function loadDashbord()
{
$.ajax({
    type: "POST",
    url: 'bin/loadDashboard.php',
    dataType: 'json',
    data: {

        Email: email

    },

    success: function (data) {

        var json = JSON.stringify(data);

        window.console.log(json);


        $.each(data, function(item)
        {
            $("#friends").append("<li> <a id='" + data[item][3] + "' href='#' class='friend_li'> <img src='img/user.png'  class='person-thumbnail'>" + " " + data[item][0] + " " + data[item][1] + "</a> </li>");
        });



        $(".friend_li").click(function(e) {

            chatFriendsId = $(this).attr('id');

            friendsName = $(this).text();



            $('#call-container').load('callView.html');

        });





    },
    error: function (errMsg)
    {
        var json = JSON.stringify(errMsg);

        window.console.log(json);

    }



});

}


function loadUser()

{


$.ajax({
    type: "POST",
    url: 'bin/loadUser.php',
    dataType: 'json',
    data: {

        Email: email,


    },

    success: function (data) {

        var json = JSON.stringify(data);

        window.console.log(json);



        $("#userName").text(data[0] + " " + data[1]);
        $("#userProfileImg").attr("src", "img/user.png")
        // another requset for
    },
    error: function (errMsg)
    {
        var json = JSON.stringify(errMsg);

        window.console.log(json);

    }



});




}
