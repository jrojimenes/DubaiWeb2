<?php
require_once '_db_mysql.php';

$json = file_get_contents('php://input');
$params = json_decode($json);

$stmt = $db->prepare("DELETE FROM events WHERE id = :id");
$stmt->bindParam(':id', $params->id);
$stmt->execute();

class Result {}

$response = new Result();
$response->result = 'OK';
$response->message = 'Delete successful';

header('Content-Type: application/json');
echo json_encode($response);

?>
