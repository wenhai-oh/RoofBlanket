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
$homelessDAO = new HomelessDAO();


$fullname = $_GET["fullname"];
$age = $_GET["age"];
$gender = $_GET["gender"];
$location = $_GET["location"];
$special_needs = $_GET["special_needs"];
$duration = $_GET["duration"];
$employment = $_GET["employment"];
$description = $_GET["description"];
$referral_id = $_GET["referrerid"];

// get search query
if(  isset($fullname) && isset($age)  && isset($gender) 
&& isset($location) && isset($special_needs) 
&& isset($duration) && isset($description) && isset($employment) && isset($referral_id) ) {
    $result = $homelessDAO->add_homeless($fullname,$age,$gender,
    $location,$special_needs,$duration,$employment,$description,$referral_id);
    // $result = false;


}
else {
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no items found
    echo json_encode(
        array("Homeless Person" => "Query parameters are not set. No results.")
    );
    exit;
}

// check if more than 0 record found
if( $result != false ) {
  
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
        array("Homeless Person" => "Homeless Person could not be added.")
    );
}
?>