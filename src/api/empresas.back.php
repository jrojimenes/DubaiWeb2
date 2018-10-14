<?php
require_once '_db_mysql.php';

$stmt = $db->prepare('CALL sp_consultaEmpresas ();');
$stmt->execute();


  $result = $stmt->fetchAll();
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fiIdEmpresa     = $row['fiIdEmpresa'];
  $e->fcnombreEmpresa = $row['fcnombre'];
  $e->fcemailEmpresa  = $row['fcemail'];
  $e->fctelefono      = $row['fctelefono'];

  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>
