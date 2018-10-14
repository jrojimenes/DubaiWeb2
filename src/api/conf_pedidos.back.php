<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('call sp_obtieneConfiguracionPaquetes (?, ?)');
$stmt->bindParam(1, $params->idEmpresa, PDO::PARAM_INT);
$stmt->bindParam(2, $params->IdPersonal, PDO::PARAM_INT);
$stmt->execute();
$result = $stmt->fetchAll();
if(count($result))
  {
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fiIdDetallePaquetes   = $row['fiIdDetallePaquetes'];
  $e->fcDescripcion         = $row['fcDescripcion'];
  $e->fiCantidadProducto    = $row['fiCantidadProducto'];
  $e->fcnombreColor         = $row['fcnombreColor'];
  $e->fccodigoHTML          = $row['fccodigoHTML'];
  $e->fcUrlImagen           = $row['fcUrlImagen'];
  $e->fiIdCraracteristica   = $row['fiIdCraracteristica'];
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["No se encontraron configuraciones..."]]);
}

?>