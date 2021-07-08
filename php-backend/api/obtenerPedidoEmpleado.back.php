<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('call sp_conusltaPedidoEmpleado (?, ?);');
$stmt->bindParam(1, $params->fiIdEmpleado    , PDO::PARAM_INT);
$stmt->bindParam(2, $params->fiIdTipoEmpleado, PDO::PARAM_INT);
$stmt->execute();
$result = $stmt->fetchAll();
if(count($result))
  {
  class Event {}
  $events = array();
foreach($result as $row) {
  $e = new Event();
  $e->fiIdEmpleado            = $row['Numero_Empleado'];
  $e->fcnombreEmpleado        = $row['Nombre_Empleado'];
  $e->fiTallaPantalon         = $row['Talla_Pantalon'];
  if ($params->fiIdTipoEmpleado == 2){
  $e->fcTallaPlayera          = $row['Talla_Plallera'];
  }
  $e->fcnombrePrenda          = $row['Prenda'];
  $e->fcColorPrenda           = $row['Color_Prenda'];
  $e->fcUrlImagen             = $row['Url_Imagen'];
  $e->fiCantidadPrenda        = $row['Cantidad'];
  $e->fdFechaRegistro         = $row['Fecha_Pedido'];
  $e->fiIdProducto            = $row['Id_Producto'];
  if ($params->fiIdTipoEmpleado == 1){
  $e->fccaracteristicaPrenda  = $row['Caracteristica_Prenda'];
  $e->fiLargoMangas           = $row['Largo_Mangas'];
  $e->fcTallaCamisa           = $row['Talla_Camisa'];
  }
  $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);
}
else{
    http_response_code(400);
    echo json_encode(['error' => ["No se encontro pedido del cliente..."]]);
}

?>