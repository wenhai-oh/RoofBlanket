<?php
    class HomelessDAO {


        // function to retrieve all homeless people information

        public function retrieve_all_homelessinfo(){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();

            $sql = "select * from homelessCollection";

            // level 2 is to make select username from users where username != current user's username
            $stmt = $pdo->prepare($sql);
            // $stmt->bindParam(":username",$username,PDO::PARAM_STR);
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

                    $homeless = array(
                        "id" => $id,
                        "fullname"  => $fullname,
                        "age" => $age,
                        "gender" => $gender,
                        "contact" => $contact,
                        "location" => $location,
                        "special_needs" => $special_needs,
                        "duration" => $duration,
                        "description" => $description,
                        "photo_url" => $photo_url,
                        "employment" => $employment,
                        "education" => $education,
                        "skills" => $skills,
                        "employment_desc" => $employment_desc,
                        "completed" => $completed,
                        "time_created" => $time_created,
                        "referral_id"=> $referral_id,
                    );

                    array_push($result_arr["records"], $homeless);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }

        # function to retrieve all information on a homeless person by their specific id

        public function retrieve_homeless_by_id($id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from homelessCollection where id=:id";

            
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

                    $homeless = array(
                        "id" => $id,
                        "fullname"  => $fullname,
                        "age" => $age,
                        "gender" => $gender,
                        "contact" => $contact,
                        "location" => $location,
                        "special_needs" => $special_needs,
                        "duration" => $duration,
                        "description" => $description,
                        "photo_url" => $photo_url,
                        "employment" => $employment,
                        "education" => $education,
                        "skills" => $skills,
                        "employment_desc" => $employment_desc,
                        "completed" => $completed,
                        "time_created" => $time_created,
                        "referral_id"=> $referral_id,
                    );
                    array_push($result_arr["records"], $homeless);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }

        # function to update the status of a homeless person to completed (1)

        public function update_complete($id){

            $datetime = date('Y-m-d H:i:s');

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "UPDATE homelessCollection SET completed=1 WHERE id=:id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);

            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute();

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;



        }

        

    }