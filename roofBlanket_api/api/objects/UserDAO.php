<?php
    class UserDAO {


        // function to retrieve ALL INFO of ALL USERS

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

        // function to retrieve all USERNAMES of all users
        public function retrieve_user_by_id($id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from usersCollection where id=:id";

            // level 2 is to make select username from users where username != current user's username
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

                    $people = array(
                        "id" => $id,
                        "username" => $username,
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

            return $result_arr;
        }

        // authenticate
        public function authenticate($username, $password) {

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
        
            // select all query
            $sql = "SELECT id,username FROM usersCollection WHERE username=:username AND password=:password";
        
            // prepare query statement
            $stmt = $pdo->prepare($sql);
            
            // bind
            $stmt->bindParam(":username",$username,PDO::PARAM_STR);
            $stmt->bindParam(":password",$password,PDO::PARAM_STR);
        
            // execute query
            $stmt->execute();
        
            $user = null;
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            if($row = $stmt->fetch()){

                $user = array();
                // []
                $user["records"] = array();

                extract($row);

                $people = array(
                    "id" => $id,
                    "username" => $username
                );

                array_push($user["records"], $people);                

            }
            $stmt = null;
            $pdo = null;
            return $user;
        }

    }
?>