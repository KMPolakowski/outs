$('#register_form').on('submit', function (e) {



    var firstname = escape($("#firstname").val());
    var lastname = escape($("#lastname").val());
    var email = escape($("#email").val());
    var password = escape($("#password").val());





    var male;

    if (document.getElementById('male').checked == true) {
        male = true;
    } else {
        male = false;
    }

    $.ajax({
        type: "POST",
        url: 'bin/register.php',
        data: {

            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Password: password,
            Male: male


        },
        error: function () {
            alert("Error")
        },
        dataType: 'text',
        success: function (data) {

            window.console.log(data);

            if (data == 'true') {
                window.location.replace('index.html');
            } else {
                window.alert('Email already registered');
            }
        }


    });


    return false;
});

function escape(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(
        /'/g, '&#x27;').replace('/', '&#x2F;');

}