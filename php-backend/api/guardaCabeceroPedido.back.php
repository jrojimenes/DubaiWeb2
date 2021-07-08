<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare("CALL sp_guardacabeceroPed(?, ?, ?, ?, ?, ?)");
$stmt->bindParam(1, $params->fiIdEmpleado     , PDO:: PARAM_INT);
$stmt->bindParam(2, $params->fiIdEmpresa      , PDO:: PARAM_INT);
$stmt->bindParam(3, $params->fiTallaPantalon  , PDO:: PARAM_INT);
$stmt->bindParam(4, $params->fiTallaCamisa    , PDO:: PARAM_INT);
$stmt->bindParam(5, $params->fiLargoManga     , PDO:: PARAM_INT);
$stmt->bindParam(6, $params->fcTallaPlayera   , PDO:: PARAM_STR);

$stmt->execute();
$result = $stmt->fetchAll();

if(count($result)){   

    class Event {}
        $events = array();
      foreach($result as $row) {
        $e = new Event();
        $e->lastId  = $row['lastId'];
        $events[] = $e;
      }

header('Content-Type: application/json');
echo json_encode($events);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["Surgio un error al actualizar los datos."]]);
}

?>
