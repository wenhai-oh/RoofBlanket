<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");


spl_autoload_register(function ($class) { 

    $pathConfig= '../config/' . $class . '.php';
    $pathObject = '../objects/' . $class . '.php';
    // $pathFunction = $class . '.php';

    if (file_exists($pathConfig)) {
        require_once $pathConfig;
    } elseif (file_exists($pathObject)) {
        require_once $pathObject;
    } 
    // elseif (file_exists($pathModels )) {
    //     require_once $pathModels ;
    // }
});
  
// initialize object
$messageDAO = new MessageDAO();


// get search query
if(  isset($_GET["sender_id"]) && isset($_GET["receiver_id"])  && isset($_GET["msg"]) && isset($_GET["homeless_id"])  ) {
    $result = $messageDAO->send_message( $_GET["sender_id"],$_GET["receiver_id"], $_GET["msg"], $_GET["homeless_id"] );
    // $result = false;


}
else {
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no items found
    echo json_encode(
        array("message" => "Query parameters are not set. No results.")
    );
    exit;
}

// check if more than 0 record found
if( $result ) {
  
    // products array
    $result_arr = array();
    $result_arr["result"] = array();
  
    array_push($result_arr["result"], $result);

    // Add info node (1 per response)
    $date = new DateTime('now', new DateTimeZone('Asia/Singapore'));
    $result_arr["info"] = array(
        "author" => "Roof Blanket",
        "response_datetime_singapore" => $date->format('Y-m-d H:i:sP')
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data
    echo json_encode($result_arr);
}
else {
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no items found
    echo json_encode(
        array("message" => "Message could not be sent.")
    );
}
?>