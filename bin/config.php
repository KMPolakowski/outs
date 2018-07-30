<?php
/**
 * Created by PhpStorm.
 * User: Polakowski
 * Date: 30.06.2018
 * Time: 18:58
 */

$host = 'outsdb.cvvynhgepn62.eu-central-1.rds.amazonaws.com';
$user = 'admin';
$password = '12345678';
$dbname = 'outsdb';


$dsn = 'mysql:host='.$host.';dbname='.$dbname;


$pdoConnection = new PDO($dsn, $user, $password);