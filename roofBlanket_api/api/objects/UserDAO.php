<?php
    class UserDAO {


        // function to retrieve ALL INFO of ALL USERS EXCEPT SELF

        public function retrieve_all_userinfo($user_id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from usersCollection where id !=:id";

            // level 2 is to make select username from users where username != current user's username
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$user_id,PDO::PARAM_INT);

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
                        "firstname" => $firstname,
                        "lastname" => $lastname,
                        "photo_url" => $photo_url,
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

        // function to retrieve all USERNAMES of specified
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
                        "password" => $password,
                        "email" => $email,
                        "firstname" => $firstname,
                        "lastname" => $lastname,
                        "photo_url" => $photo_url,
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


        public function retrieve_chat_users($user_id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select distinct usersCollection.id, usersCollection.username, usersCollection.photo_url, chatCollection.homeless_id, homelessCollection.fullname from 
            usersCollection inner join chatCollection on 
            (usersCollection.id = chatCollection.sender_id and chatCollection.receiver_id =:receiverid or 
            usersCollection.id = chatCollection.receiver_id and chatCollection.sender_id =:senderid) 
            inner join homelessCollection on homelessCollection.id = chatCollection.homeless_id;
            ";

            // level 2 is to make select username from users where username != current user's username
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":senderid",$user_id,PDO::PARAM_INT);
            $stmt->bindParam(":receiverid",$user_id,PDO::PARAM_INT);

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
                        "photo_url" => $photo_url,
                        "homeless_id" => $homeless_id,
                        "homeless_name" => $fullname
                    );

                    array_push($result_arr["records"], $people);
                }
            }

            $stmt = null;
            $pdo = null;

            // var_dump($result_arr["records"]);

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

        public function register_user($firstname,$lastname,$username,$email,$password){

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();


            $sql_get_id="SELECT id FROM usersCollection ORDER BY id DESC LIMIT 1";
            $stmt = $pdo->prepare($sql_get_id);
            $result = $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            if($row = $stmt->fetch()){

                extract($row);
                $new_id = $id + 1;            
            }
            
            $datetime = date('Y-m-d H:i:s');

            $sql = "INSERT INTO usersCollection VALUES(?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)";

        
            $stmt = $pdo->prepare($sql);
            
            $result = $stmt->execute([$new_id, $username, $password, $email, $firstname, $lastname, $datetime]);

            // $result = $stmt->execute([$new_id, $username, $password, $email, $name, contact, address,
            // housing_type, num_homeless_attached, num_homeless_helped, employer_status, $datetime]);


            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;

        }

        #function to update user profile
        public function update_profile($id,$firstname,$lastname,$email,$contact,$address,$employer_status,$housing_type){


            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "UPDATE usersCollection SET firstname=:firstname, lastname=:lastname, email=:email, contact=:contact, 
            address=:newaddr, employer_status=:employer_status, housing_type=:housing_type WHERE id=:id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->bindParam(":firstname",$firstname,PDO::PARAM_STR);
            $stmt->bindParam(":lastname",$lastname,PDO::PARAM_STR);
            $stmt->bindParam(":email",$email,PDO::PARAM_STR);
            $stmt->bindParam(":contact",$contact,PDO::PARAM_INT);
            $stmt->bindParam(":newaddr",$address,PDO::PARAM_STR);
            $stmt->bindParam(":employer_status",$employer_status,PDO::PARAM_STR);
            $stmt->bindParam(":housing_type",$housing_type,PDO::PARAM_STR);

            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute();

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;


        }

        public function change_password($id, $new_password){

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "UPDATE usersCollection SET password=:password WHERE id=:id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->bindParam(":password",$new_password,PDO::PARAM_STR);

            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute();

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;

        }

        

    }

    
?>