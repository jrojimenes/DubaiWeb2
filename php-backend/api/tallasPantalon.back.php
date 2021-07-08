<?php
require_once '_db_mysql.php';

$stmt = $db->prepare('CALL sp_medidasTallaPantalon();');
$stmt->execute();


  $result = $stmt->fetchAll();
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fntallaPantalon             = $row['fitalla'];
  $e->fcpulgadasTallaPantalon     = $row['cpulgadas'];
  $e->fncentimetrosTallaPantalon  = $row['fncentimetros'];
  $e->fnrangoMenor                = $row['fnrangoMenor'];
  $e->fnrangoMayor                = $row['fnrangoMayor'];

  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>

