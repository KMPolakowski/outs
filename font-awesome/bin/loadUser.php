<?php
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 29.04.2018
 * Time: 08:32
 */

require_once 'config.php';



$email = $_POST['Email'];


if(isset($email))
{
    $sql = "SELECT u_firstname, u_lastname, u_male FROM u_users WHERE u_email=?";
    $query = $pdoConnection->prepare($sql);
    $query->execute([$email]);


    $outcome = json_encode($query->fetch());


    echo $outcome;

}

$pdoConnection = null;








