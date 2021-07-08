<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('call sp_consultaTipoPersonal ();');
$stmt->execute();
$result = $stmt->fetchAll();
if(count($result))
  {
  class EmployeType {}
  $employType = array();
foreach($result as $row) {
  $e = new EmployeType();
  $e->fiIdTipoPersonal                 = $row['fiIdTipoPersonal'];
  $e->fcDescripcion                    = $row['fcDescripcion'];
  $employType[] = $e;
}
header('Content-Type: application/json');
echo json_encode($employType);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["No se encontraron registros tipo personal..."]]);
}
?>