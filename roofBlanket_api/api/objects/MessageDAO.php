<?php
    class messageDAO {


        // function to retrieve all messages within a specific chat instance (between same two user on one homeless id)

        public function retrieve_user_message($user_id, $user2_id, $homeless_id){
            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "SELECT * FROM chatCollection WHERE ((sender_id =:senderid AND receiver_id =:receiverid ) OR 
            (sender_id =:receiverid AND receiver_id=:senderid)) AND homeless_id=:homelessid ORDER BY sent_datetime ASC";

            // level 2 is to make select username from users where username != current user's username
            $stmt = $pdo->prepare($sql);
            
            // bind
            $stmt->bindParam(":senderid",$user_id,PDO::PARAM_INT);
            $stmt->bindParam(":receiverid",$user2_id,PDO::PARAM_INT);
            $stmt->bindParam(":homelessid",$homeless_id,PDO::PARAM_INT);
            
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

                    $message = array(
                        "sender_id" => $sender_id,
                        "receiver_id" => $receiver_id,
                        "message" => $message,
                        "sent_datetime" => $sent_datetime,
                        "homeless_id" => $homeless_id,
                    );

                    array_push($result_arr["records"], $message);
                }
            }

            $stmt = null;
            $pdo = null;

            // var_dump($result_arr["records"]);

            return $result_arr;
        }


        # function used to send messgae 
        
        public function send_message($sender_id, $receiver_id, $msg, $homeless_id){

            $datetime = date('Y-m-d H:i:s');

            $conn_manager = new Database();
            $pdo = $conn_manager->getConnection();
            
            $sql = "INSERT INTO chatCollection VALUES(?, ?, ?, ?, ?)";

            $stmt = $pdo->prepare($sql);


            // ADD CODE TO GET HOMELESSID
            
            $result = $stmt->execute([$sender_id, $receiver_id, $msg, $datetime, $homeless_id]);

            $stmt = null;
            $pdo = null;

            // return query result (Boolean)
            return $result;
        }

    }
?>