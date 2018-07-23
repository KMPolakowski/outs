<?php
session_start();
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 29.04.2018
 * Time: 11:51
 */

require_once 'config.php';

$sender = $_POST['Sender'];
$recipient = $_POST['Recipient'];


if(isset($sender, $recipient))
{


    $sql = "SELECT f_id1, f_id2, m_t, m_m FROM m_messages WHERE (f_id1 = :sender OR f_id2 = :sender) AND (f_id1 = :recipient OR f_id2 = :recipient)";

    $query = $pdoConnection->prepare($sql);
    $query->execute(['sender' => $sender, 'recipient' => $recipient]);

    $outcome = json_encode($query->fetchAll());

    echo $outcome;

}


$pdoConnection = null;









