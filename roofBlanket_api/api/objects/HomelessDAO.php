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
                        "home_offered_by"=>$home_offered_by

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
                        "home_offered_by"=>$home_offered_by
                    );
                    array_push($result_arr["records"], $homeless);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }


        # function to retrive homelessperson with complete status 0


        public function retrieve_all_incomplete_homeless(){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from homelessCollection where completed=0";
            
            $stmt = $pdo->prepare($sql);
            // $stmt->bindParam(":id",$id,PDO::PARAM_INT);
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
                        "home_offered_by"=>$home_offered_by
                    );
                    array_push($result_arr["records"], $homeless);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }


        # get all homeless info who is seeking empoloyment
        public function retrieve_all_jobless_homeless(){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from homelessCollection where employment=0";
            
            $stmt = $pdo->prepare($sql);
            // $stmt->bindParam(":id",$id,PDO::PARAM_INT);
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
                        "home_offered_by"=>$home_offered_by
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


            // update completed to 1, means referrer acknowledge
            
            // update home_offered_by to null

            // update home_offered_by to user_id

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

        public function reject_offer($id){


            // update completed to 1, means referrer acknowledge
            
            // update home_offered_by to null

            // update home_offered_by to user_id

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "UPDATE homelessCollection SET home_offered_by = NULL WHERE id=:id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);

            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute();

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;

        }

        public function offer_home($id, $host_id){

            // update home_offered_by to user_id

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "UPDATE homelessCollection SET home_offered_by =:hostid WHERE id=:id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);

            $stmt->bindParam(":hostid",$host_id,PDO::PARAM_INT);
            
            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute();

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;

        }


        # function to add homeless person
        public function add_homeless($fullname,$age,$gender,
        $location,$special_needs,$duration,$employment,$description,$referral_id){

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();


            // ADD CODE TO GET HOMELESSID
            $sql_get_id="SELECT id FROM homelessCollection ORDER BY id DESC LIMIT 1";
            $stmt = $pdo->prepare($sql_get_id);
            $result = $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            if($row = $stmt->fetch()){

                extract($row);
                $new_id = $id + 1;            
            }

            // end of get homelessid
            
            if ($gender == 'M'){
                $photo_url = "https://roof-blanket.000webhostapp.com/dist/Images/boy.png";
            }else if($gender == 'F'){
                $photo_url = "https://roof-blanket.000webhostapp.com/dist/Images/girl.png";
            }else{
                # random placeholder url
                $photo_url = "";
            }

            $sql = "INSERT INTO homelessCollection VALUES(?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, '', '','', 0, ?, ?, NULL)";

            $stmt = $pdo->prepare($sql);

            $datetime = date('Y-m-d H:i:s');
            
            $result = $stmt->execute([$new_id, $fullname, $age, $gender, $location, 
            $special_needs, $duration, $description, $photo_url, $employment, $datetime,$referral_id]);

            $stmt = null;
            $pdo = null;

            if ($result){
                return $new_id;
                
            }


            // return query result (Boolean)
            return $result;

        }

        

    }