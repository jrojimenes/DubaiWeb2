<?php
require_once '_db_mysql.php';

$stmt = $db->prepare('CALL sp_tallasplayera();');
$stmt->execute();


  $result = $stmt->fetchAll();
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fntallacamisapulgadas           = $row['fiIdtallaPlayera'];
  $e->fntallacomercialcamisa          = $row['fntallacamisa'];
  $e->fntallacamisa                   = $row['fntallacamisa'];
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>