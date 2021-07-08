<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare("CALL sp_guardaMensajeUsuario(?, ?, ?);");
$stmt->bindParam(1, $params->fiidEmpleado, PDO:: PARAM_INT);
$stmt->bindParam(2, $params->fcAsuntos   , PDO:: PARAM_STR);
$stmt->bindParam(3, $params->fcDetalles  , PDO:: PARAM_STR);


if($stmt->execute()){   

class Result {}

$response = new Result();
$response->result = 'OK';
$response->message = 'Update successful';

header('Content-Type: application/json');
echo json_encode($response);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["Surgio un error al actualizar los datos."]]);
}

?>
