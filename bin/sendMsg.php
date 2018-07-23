<?php
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 29.04.2018
 * Time: 13:17
 */
session_start();
require_once 'config.php';




$msg = $_POST['Msg'];
$sender = $_SESSION['User'];
$recipient = $_SESSION['Friend'];



if(isset($msg, $sender, $recipient))
{
    // SQL INJECTION PREVENTION NEEDS TO BE IMPLEMENTED

    $query = "INSERT into new_messages (f_id1, f_id2, m_m) VALUES
  ('$sender','$recipient', '$msg')";


    $result = mysqli_query($db, $query);

    echo $result;

    //echo $outcome;

}

mysqli_close($db);