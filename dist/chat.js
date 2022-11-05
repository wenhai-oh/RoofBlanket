// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {

            people_records: [],
            message_records: [],
            current_user_id: sessionStorage.getItem("userid"),

            new_message: '',
            other_user: {},
        }
    },

    methods: {

        retrieve_message(){

            console.log("userid now is " + this.current_user_id)

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"

            console.log("other userid now is " + other_user_id)


            let api_endpoint = "http://localhost/roofBlanket_api/api/message/getusermessage.php"

            let user_ids = {
                current_user_id: this.current_user_id,
                other_user_id: other_user_id
            }

            axios.get(api_endpoint, { 
                params: user_ids
            })
            .then(response => {
                console.log( response.data.records )
                this.message_records = response.data.records
                
            })
            .catch(error => {
                console.log( error.message )
            })


        },

        get_chat_user(){

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"

            console.log("other userid now is " + other_user_id)

            let api_endpoint = "http://localhost/roofBlanket_api/api/user/getuserinfobyid.php"

            let user_id = {
                id: other_user_id,
            }

            axios.get(api_endpoint, { 
                params: user_id
            })
            .then(response => {
                
                // this.message_records = response.data.records
                this.other_user = response.data.records[0]
                console.log( "I FOUND HIM" + this.other_user.name)
                
            })
            .catch(error => {
                console.log( error.message )
            })

        },

        retrieve_users() {
            console.log("=== i am calling some function here() ===")

            // Check API documentation at: http://localhost/krazypeople/

            // YOU MAY NEED TO MODIFY THIS
            // based on your local computer setting
            let api_endpoint = "http://localhost/roofblanket_api/api/user/getusersinfo.php"


            // people_records = []
            let current_user = {
                current_user_id: this.current_user_id
            }

            axios.get(api_endpoint, { 
                params: current_user
            })
            .then(response => {

                this.people_records = {}
                console.log('hello i am back')
                // console.log(response.data)
                records = response.data.records
                console.log(response)

                console.log(records)
                console.log('going in')
                this.people_records = records

                // console.log(records)

                // for (index in records){
                    
                //     // this.people_records.push(record)
                //     // console.log(records[index])
                //     user_id = records[index]['id']
                //     user_name = records[index]['username']

                //     this.people_records[user_id] = user_name
                // }

                // Do you need to do anything here so that
                // <table> shows all messages retrieved from the API call?
                // HINT: Where does <table> obtain message data from? Which data property?
            })
            .catch(error => {
                console.log( error.message )
            })
        },

        view_chat(user_id){

            this.other_user_id = user_id
            window.location.href = "chat.html?id=" + user_id

        },

        send_message(){

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"

            let api_endpoint = "http://localhost/roofblanket_api/api/message/sendmessage.php"

            let message_info = {
                sender_id: this.current_user_id,
                receiver_id: other_user_id,
                msg: this.new_message
            }

            axios.get(api_endpoint, { 
                params: message_info
            })
            .then(response => {
                
                console.log(response)
                this.new_message = ''
                this.retrieve_message()
                
            })
            .catch(error => {
                console.log( error.message )
            })

        }
    },
    beforeMount(){
        this.retrieve_users()
        this.get_chat_user()
        this.retrieve_message()
     }

})

// Link this Vue instance with <div id="main">
vuemain.mount("#main")