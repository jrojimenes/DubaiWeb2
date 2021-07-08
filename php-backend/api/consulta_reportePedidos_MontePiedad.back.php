<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare('CALL sp_conusltaDetallePedidosEmpleados (?);');
$stmt->bindParam(1, $params->fiIdTipoEmpleado, PDO::PARAM_INT);
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
  if($params->fiIdTipoEmpleado == 1){
  $e->fiTallaCamisa                = $row['Talla_Camisa'];
  $e->fiLargoMangas                = $row['Largo_Mangas'];
  $e->fcDetallePantalonVestirAzul  = $row['Pantalon_Azul'];
  $e->fiCantidadPantalonVestirAzul = $row['Cantidad_PantalonVestirAzul'];
  $e->fcDetallePantalonVestirGris  = $row['Pantalon_Gris'];
  $e->fiCantidadPantalonVestirGris = $row['Cantidad_PantalonVestirGris'];
  $e->fcDetalleCamisaPerfilVino    = $row['Camisa_Perfil_Vino'];
  $e->fiCantidadCamisaPerfilVino   = $row['Cantidad_CamisaPerfilVino'];
  $e->fcDetalleCamisaPerfilGris    = $row['Camisa_Perfil_Gis'];
  $e->fiCantidadCamisaPerfilGris   = $row['Cantidad_CamisaPerfilGris'];
  $e->fcDetalleCamisaAzul          = $row['Camisa_Azul'];
  $e->fiCantidadCamisaAzul         = $row['Cantidad_CamisaAzul'];
}  
  if($params->fiIdTipoEmpleado == 2){
  $e->fcTallaPlayera           = $row['Talla_Plallera'];
  $e->fcPlayera1               = $row['Prenda1'];   
  $e->fcColorPlayera1          = $row['Color_Prenda1'];
  $e->fiCnatidadPlayera1       = $row['Cantidad_Prenda1'];
  $e->fcPlayera2               = $row['Prenda2'];   
  $e->fcColorPlayera2          = $row['Color_Prenda2'];
  $e->fiCnatidadPlayera2       = $row['Cantidad_Prenda2'];
  $e->fcPlayera3               = $row['Prenda4'];   
  $e->fcColorPlayera3          = $row['Color_Prenda4'];
  $e->fiCnatidadPlayera3       = $row['Cantidad_Prenda4'];
  $e->fcPantalon1              = $row['Prenda3'];   
  $e->fcColorPantalon1         = $row['Color_Prenda3'];
  $e->fiCnatidadPantalon1      = $row['Cantidad_Prenda3'];
}
  $e->fdFechaRegistro          = $row['Fecha_Pedido'];
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