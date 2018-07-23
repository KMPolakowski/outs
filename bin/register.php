<?php
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 20.04.2018
 * Time: 19:45
 */



require_once 'config.php';



$firstName = $_POST['FirstName'];
$lastName = $_POST['LastName'];
$email = $_POST['Email'];
$password = password_hash($_POST['Password'], PASSWORD_DEFAULT);
$male_input = $_POST['Male'];


$male = 0;
if($male_input)
{
    $male = 1;
}
else
{
    $male = 0;
}


if(isset($firstName, $lastName, $email, $password, $male))
{
    $sql= "SELECT * FROM u_users WHERE u_email=? LIMIT 1";

    $query = $pdoConnection->prepare($sql);
    $query->execute([$email]);

    if($query->rowCount() == 0) {

        $sql = "INSERT INTO u_users (u_firstname, u_lastname, u_email, u_password, u_male)
VALUES(:firstName, :lastName, :email, :password, :male)";

        $query = $pdoConnection->prepare($sql);

        if($query->execute(['firstName' => $firstName, 'lastName' => $lastName, 'email' => $email, 'password' => $password, 'male' => $male]));
        {
            echo json_encode(true);
        }

    }

    else{
        echo json_encode(false);
    }
}


