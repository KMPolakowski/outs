<?php


require_once 'config.php';


$requestingUser = $_POST['RequestingUser'];
$requestedUser = $_POST['RequestedUser'];


if(isset($requestingUser, $requestedUser))
{
    $sql = "SELECT * FROM f_friends WHERE f_id1 LIKE :requestedUser AND f_id2 LIKE :requestingUser";

    $query = $pdoConnection->prepare($sql);
    $query->execute(['requestedUser' => $requestedUser, 'requestingUser' => $requestingUser]);



    if($query->rowCount() == 0)
    {

        $sql = "INSERT IGNORE into r_requests (f_id1, f_id2)
                  VALUES (:requestingUser, :requestedUser);";

        $query = $pdoConnection->prepare($sql);
        $outcome = $query->execute(['requestedUser' => $requestedUser, 'requestingUser' => $requestingUser]);


        echo json_encode($outcome);
    }



}


