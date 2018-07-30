function escape(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace('/', '&#x2F;');

}




$('#login_form').on('submit', function (e) {

    e.preventDefault();


    var email = escape($("#inputEmail").val());
    var password = escape($("#inputPassword").val());

    Cookies.set("Email", email);
    Cookies.set("Pass", password);

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

            window.console.log(data[0]);

            if (data[0] == true) {
                loggedUserId = [1];

                window.location.replace('dashbord.html');
            } else {
                window.console.log("Login unsuccessful");
            }

        },
        error: function (data) {
            var json = JSON.stringify(data);

            window.console.log(json);


        },
        async: false




    });



});