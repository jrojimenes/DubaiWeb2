<?php
require_once '_db_mysql.php';

$stmt = $db->prepare('CALL sp_relacioncamisapantalon();');
$stmt->execute();


  $result = $stmt->fetchAll();
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fntallacamisa             = $row['fntallacamisa'];
  $e->fntallapantalon           = $row['fntallapantalon'];
  $e->fntallacomercialcamisa    = $row['fntallacomercialcamisa'];
  // $e->fntallacamisapulgadas     = $row['fntallacamisapulgadas'];
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>
