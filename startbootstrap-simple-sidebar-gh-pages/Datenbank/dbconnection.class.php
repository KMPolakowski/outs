<?php
class DbConnection
{
    private $conn = null;
    public function __construct($dbName, $username, $pass = "", $server = "localhost")
    {
        try {
            $this->conn = new PDO("mysql:host={$server};dbname={$dbName};charset=utf8", $username, $pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            /* Erstellt {"error": "Fehlernachricht"} indem
             * ein array mit $arr["error"] = "..." erstellt wird. */
            echo json_encode(array("error" => $e->getMessage()));
            die(1);
        }
    }
    public function getData($sqlQuery, $params = array())
    {
        if ($this->conn === null) {
            return "";
        }
        try {
            $sth = $this->conn->prepare($sqlQuery);
            $sth->execute($params);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($result);
        } catch (PDOException $e) {
            return json_encode(array("error" => $e->getMessage()));
        }
        return json_encode($result);
    }
}