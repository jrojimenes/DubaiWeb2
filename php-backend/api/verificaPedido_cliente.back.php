<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare("call sp_verificaPedidoExistenteEmpleado (? ,?);");
$stmt->bindParam(1, $params->fiIdEmpleado     , PDO:: PARAM_INT);
$stmt->bindParam(2, $params->fiIdEmpresa      , PDO:: PARAM_INT);


$stmt->execute();
$result = $stmt->fetchAll();

if(count($result)){   

    class Event {}
        $events = array();
      foreach($result as $row) {
        $e = new Event();
        $e->existencia_Pedido  = $row['VIRESULTADO'];
        $events[] = $e;
      }

header('Content-Type: application/json');
echo json_encode($events);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["Surgio un error al verificar existencia de pedido del cliente."]]);
}

?>



