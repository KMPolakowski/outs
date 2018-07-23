<?php

require_once 'config.php';


$requestedUser = $_POST['RequestedUser'];

if(isset($requestedUser))
{

    $sql ="SELECT u_users.u_firstname, u_users.u_lastname, u_users.u_id, r_requests.r_id
              FROM u_users
              LEFT JOIN r_requests ON u_users.u_id = r_requests.f_id1
              WHERE r_requests.f_id2 LIKE ?";

    $query = $pdoConnection->prepare($sql);
    $query->execute(([$requestedUser]));
    $outcome = $query->fetchAll();

    echo json_encode($outcome);

}

$pdoConnection = null;