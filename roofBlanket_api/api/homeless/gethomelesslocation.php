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
$homelesslocationDAO = new HomelessLocationDAO();


$homeless_array = $homelesslocationDAO->retrieve_all_homelesslocationinfo();

if($homeless_array != null){

    // var_dump($user_array);

    // Add info node (1 per response)
    $date = new DateTime('now', new DateTimeZone('Asia/Singapore'));
    $homeless_array["info"] = array(
        "author" => "Roof Blanket",
        "response_datetime_singapore" => $date->format('Y-m-d H:i:sP')
    );
    

        // set response code - 200 OK
        http_response_code(200);
    
        // show products data
        echo json_encode($homeless_array);
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