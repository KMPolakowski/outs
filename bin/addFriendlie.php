<?php


require_once 'config.php';

$requestingUser = $_POST['RequestingUser'];
$requestedUser = $_POST['RequestedUser'];

$decision = $_POST['Decision'];
$request = $_POST['RequestId'];

if(isset($requestingUser, $requestedUser, $decision, $request)) {

    $sql = 'DELETE FROM r_requests WHERE r_id LIKE ?';
    $query = $pdoConnection->prepare($sql);

    $resultDel = $query->execute([$request]);


    if ($resultDel) {

        if ($decision) {
            $sql = "INSERT into f_friends (f_id1, f_id2) VALUES (:requestedUser, :requestingUser),(:requestingUser, :requestedUser) ";

            $query = $pdoConnection->prepare($sql);


            $result = $query->execute(['requestedUser' => $requestedUser, 'requestingUser' => $requestingUser]);

            echo json_encode($result);

        }
    }

}

$pdoConnection = null;