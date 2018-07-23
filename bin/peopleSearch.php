<?php


require_once 'config.php';


$input = '%'.$_POST['Input'].'%';
$user = $_POST['User'];


if(isset($input, $user))
{

    $sql= "SELECT u_users.u_id, u_users.u_firstname, u_users.u_lastname
              FROM u_users
              WHERE CONCAT(u_users.u_firstname, ' ', u_users.u_lastname) LIKE :input
              AND u_id NOT LIKE :user
              AND u_id NOT IN (SELECT f_id1 FROM f_friends WHERE f_id2 LIKE :user);";

    $query = $pdoConnection->prepare($sql);
    $query->execute(['input' => $input, 'user' => $user]);


    $outcome = json_encode($query->fetchAll());

    echo $outcome;

}

$pdoConnection = null;