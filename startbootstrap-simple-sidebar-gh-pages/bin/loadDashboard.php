<?php
/**
 * Created by PhpStorm.
 * User: Deus Vult
 * Date: 24/04/2018
 * Time: 14:04
 */

require_once 'config.php';




$email = $_POST['Email'];

$userID;

if(isset($email))
{


    $sql = "SELECT u_id FROM u_users WHERE u_email=?";


    $query = $pdoConnection->prepare($sql);
    $query->execute([$email]);


    $userID = ($query->fetch())[0];
}




if(isset($userID))
{
    $sql =   "SELECT u_users.u_firstname, u_users.u_lastname, u_users.u_male, u_users.u_id FROM u_users
              LEFT JOIN f_friends ON u_users.u_id = f_friends.f_id2
              WHERE f_friends.f_id1 LIKE ?";

    $query = $pdoConnection->prepare($sql);
    $query->execute([$userID]);
    $outcome = json_encode($query->fetchAll());
    echo $outcome;
}

$pdoConnection = null;





