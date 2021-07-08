<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare("CALL sp_guardadetallePedido(?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bindParam(1, $params->fiIdetallePed          , PDO:: PARAM_INT);
$stmt->bindParam(2, $params->fiIdEmpleado           , PDO:: PARAM_INT);
$stmt->bindParam(3, $params->fiIdEmpresa            , PDO:: PARAM_INT);
$stmt->bindParam(4, $params->fidetallePantalon1     , PDO:: PARAM_INT);
$stmt->bindParam(5, $params->fidetallePantalon2     , PDO:: PARAM_INT);
$stmt->bindParam(6, $params->fidetalleCamisaVino    , PDO:: PARAM_INT);
$stmt->bindParam(7, $params->fidetalleCamisaGris    , PDO:: PARAM_INT);
$stmt->bindParam(8, $params->fiDetalleCamisaAzul    , PDO:: PARAM_INT);


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
