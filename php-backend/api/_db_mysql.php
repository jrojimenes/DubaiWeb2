<?php
$host = "localhost";
$port = 3306;
$username = "desarrollo";
$password = "D3sarr0ll0";
$database = "dubaiuni_dbpedidos";   
date_default_timezone_set("UTC");

$db = new PDO("mysql:host=$host;port=$port",
               $username,
               $password);
$db->setAttribute(PDO::ATTR_ERRMODE, 
                  PDO::ERRMODE_EXCEPTION);

 $db->exec("use `$database`");

?>