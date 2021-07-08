<?php
require_once '_db_mysql.php';

$stmt = $db->prepare('CALL sp_consultaRelacionCuelloPantalon();');
$stmt->execute();


  $result = $stmt->fetchAll();
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fiIdRelcuelloPantalon     = $row['fiIdRelcuelloPantalon'];
  $e->fcTallaCamisa             = $row['fcTallaCamisa'];
  $e->fntallaPantalon           = $row['fiTallaPantalon'];
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>



