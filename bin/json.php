<?php
/**
 * Created by PhpStorm.
 * User: Deus Vult
 * Date: 24/04/2018
 * Time: 17:04
 */

/**
 * Created by PhpStorm.
 * User: Deus Vult
 * Date: 24/04/2018
 * Time: 14:04
 */

header('Content-Type: application/json');
$db = mysqli_connect('outs.cvvynhgepn62.eu-central-1.rds.amazonaws.com', 'admin', 'Blyatmobil', 'outs');



$email = $_POST['Email'];



if(isset($email))
{
    //$email = mysqli_escape_string($in_email);
    //$password = mysqli_escape_string($in_password);


    // SQL INJECTION PREVENTION NEEDS TO BE IMPLEMENTED

    $query = "SELECT u_firstname, u_lastname FROM u_users WHERE u_email='$email'";

    $result = mysqli_query($db, $query);
    if(mysqli_num_rows($result) == 0)
    {
        echo "Email adress unknown";

    }

    else
    {
        $row = mysqli_fetch_row($result);


        $firstName = $row[0];
        $lastName = $row[1];

        echo $firstName, " ", $lastName;


    }
}
