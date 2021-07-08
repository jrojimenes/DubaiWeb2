<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('CALL sp_consultaEmpleado (?, ?)');
$stmt->bindParam(1, $params->idEmpresa, PDO::PARAM_INT);
$stmt->bindParam(2, $params->password, PDO::PARAM_INT);
$stmt->execute();
$result = $stmt->fetchAll();
if(count($result))
  {
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fcnombrePersonal  = $row['fcnombrePersonal'];
  $e->fcapellidoPaterno = $row['fcapellidoPaterno'];
  $e->fcapellidoMaterno = $row['fcapellidoMaterno'];
  $e->finumeroEmpleado  = $row['finumeroEmpleado'];
  $e->fcmail            = $row['fcmail'];
  $e->fctelefono        = $row['fctelefono'];
  $e->fcsucursal        = $row['fcnombreSucursal'];
  $e->fccategoria       = $row['fccategoria'];
  $e->fcempresa         = $row['fcNombreEmpresa'];
  $e->fiestatusEmpresa  = $row['fiestatusEmpresa'];
  $e->fiIdTipoPersonal  = $row['fiIdTipoPersonal'];

  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["Usuario o contraseña incorrectos"]]);
}

?>
