<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('call sp_consultaCategoriasPersonal ();');
$stmt->execute();
$result = $stmt->fetchAll();
if(count($result))
  {
  class EmployeCategory {}
  $employCategory = array();
foreach($result as $row) {
  $e = new EmployeCategory();
  $e->fiIdCategoria                    = $row['fiIdCategoria'];
  $e->fcdescripcion                    = $row['fcdescripcion'];
  $e->fiTipoPersonal                   = $row['fiTipoPersonal'];
  $employCategory[] = $e;
}
header('Content-Type: application/json');
echo json_encode($employCategory);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["No se encontraron registros tipo personal..."]]);
}
?>