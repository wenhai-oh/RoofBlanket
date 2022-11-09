<?php
    class HomelessLocationDAO {


        // function to retrieve all homeless location

        public function retrieve_all_homelesslocationinfo(){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from homelessLocation";

            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            
            $result_arr = null;

            $num = $stmt->rowCount();
            if($num > 0) {

                // products array
                $result_arr = array();
                // []
                $result_arr["records"] = array();

                while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                    // extract row
                    // this will make $row['name'] to
                    // just $name only
                    // converts a dictionary key to variable name and value to variable value
                    extract($row);

                    $homeless_loc = array(
                        "id" => $id,
                        "latitude"  => $latitude,
                        "longitude" => $longitude,
                    );


                    array_push($result_arr["records"], $homeless_loc);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }
        

        # function used to retrieve all homelesslocation by a specific homeless id

        public function retrieve_homelesslocation_by_id($id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from homelesslocation where id=:id";

            
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
            
            $result_arr = null;

            $num = $stmt->rowCount();
            if($num > 0) {

                // products array
                $result_arr = array();
                // []
                $result_arr["records"] = array();

                while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                    // extract row
                    // this will make $row['name'] to
                    // just $name only
                    // converts a dictionary key to variable name and value to variable value
                    extract($row);

                    $homeless_loc = array(
                        "id" => $id,
                        "latitude"  => $latitude,
                        "longitude" => $longitude,
                    );

                    array_push($result_arr["records"], $homeless_loc);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }
    }
?>