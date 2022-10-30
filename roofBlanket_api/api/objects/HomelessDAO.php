<?php
    class HomelessDAO {


        // function to retrieve ALL INFO of ALL USERS

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

                    $people = array(
                        "id" => $id,
                        "name"  => $name,
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
                    );


                    array_push($result_arr["records"], $people);
                }
            }

            $stmt = null;
            $pdo = null;

            return $result_arr;
        }

        public function retrieve_all_userinfo(){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();

            $sql = "select * from usersCollection";

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

                    $people = array(
                        "id" => $id,
                        "username" => $username,
                        "password" => $password,
                        "email" => $email,
                        "name" => $name,
                        "contact" => $contact,
                        "address" => $address,
                        "housing_type" => $housing_type,
                        "num_homeless_attached" => $num_homeless_attached,
                        "num_homeless_helped" => $num_homeless_helped,
                        "employer_status" => $employer_status,
                        "time_created" => $time_created,
                    );

                    array_push($result_arr["records"], $people);
                }
            }

            $stmt = null;
            $pdo = null;

            // var_dump($result_arr["records"]);

            return $result_arr;
        }

    }