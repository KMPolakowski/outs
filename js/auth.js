function auth() {

    var email = Cookies.get("Email");
    var password = Cookies.get("Pass");


    $.ajax({
        type: "POST",
        url: 'bin/login.php',
        dataType: 'json',
        data: {

            Email: email,
            Password: password

        },


        success: function (data) {

            var json = JSON.stringify(data);


            window.console.log(json);

            if (data[0] == true) {
                loggedUserId = data[1];
            } else {
                window.location.replace('index.html');
            }

        },
        error: function (data) {

            var json = JSON.stringify(data);

            window.console.log(json);

            window.location.replace('index.html');


        },
        async: false




    });

}