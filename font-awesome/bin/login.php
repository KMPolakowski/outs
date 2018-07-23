<?php
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 22.04.2018
 * Time: 19:15
 */



require_once 'config.php';



$email = $_POST['Email'];
$password = $_POST['Password'];


if(isset($email, $password))
{

    $sql = "SELECT u_password, u_id FROM u_users WHERE u_email=?";

    $query = $pdoConnection->prepare($sql);
    $query->execute([$email]);
    $outcome = $query->fetch();

    if($query->rowCount() > 0)
    {
        $hashed_password = $outcome[0];
        $userID = $outcome[1];

        if(password_verify($password, $hashed_password))
        {
            $outcome = array();
            $passwordOK = true;
            array_push($outcome, $passwordOK, $userID);
            echo json_encode($outcome);
        }
        else
        {
            echo "Wrong password";
        }

    }
    else
    {
        echo "Email unknown";
    }
}

$pdoConnection = null;


