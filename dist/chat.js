// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {

            chat_history_person: [],
            message_records: [],
            current_user_id: sessionStorage.getItem("userid"),

            new_message: '',
            other_user: {},

            homeless_name: '',
            homeless_status: ''
        }
    },

    methods: {

        retrieve_message(){
       
            
            // console.log("userid now is " + this.current_user_id)

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            // console.log("other userid now is " + other_user_id)


            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/message/getusermessage.php"

            let user_ids = {
                current_user_id: this.current_user_id,
                other_user_id: other_user_id,
                homeless_id: homeless_id
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

        update_messages(){

            setInterval(() => {
                
            
            // console.log("userid now is " + this.current_user_id)

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid

            if (other_user_id != null){
            // console.log("other userid now is " + other_user_id)


            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/message/getusermessage.php"

            let user_ids = {
                current_user_id: this.current_user_id,
                other_user_id: other_user_id,
                homeless_id: homeless_id
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
            })}else{
                console.log('update not done as no user is selected')
            }


        }, 5000)},

        retrieve_users() {
            console.log("=== i am calling some function here() ===")

            // Check API documentation at: https://roof-blanket.000webhostapp.com/krazypeople/

            // YOU MAY NEED TO MODIFY THIS
            // based on your local computer setting
            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofblanket_api/api/message/getchatuser.php"


            // people_records = []
            let current_user = {
                id: this.current_user_id
            }

            axios.get(api_endpoint, { 
                params: current_user
            })
            .then(response => {

                this.chat_history_person = {}

                this.chat_history_person = response.data.records
                console.log(response.data.records)

            })
            .catch(error => {
                console.log( error.message )
            })
        },

        view_chat(user_id, homeless_id){

            this.other_user_id = user_id
            window.location.href = "chat.html?id=" + user_id + "&homelessid=" + homeless_id

        },

        get_chat_user(){

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            // console.log("other userid now is " + other_user_id)


            if (other_user_id != null){

                let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/user/getuserinfobyid.php"

                let api_endpoint2 = "https://roof-blanket.000webhostapp.com/roofblanket_api/api/homeless/gethomelessinfobyid.php"

                let user_id = {
                    id: other_user_id,
                }

                let homeless = {
                    id: homeless_id
                }


                axios.get(api_endpoint, { 
                    params: user_id
                })
                .then(response => {
                    
                    // this.message_records = response.data.records
                    this.other_user = response.data.records[0]
                    
                    axios.get(api_endpoint2, {
                        params: homeless
                    })
                    .then(response => {

                        this.homeless_name = response.data.records[0].fullname
                        this.homeless_status = response.data.records[0].completed
                        console.log(this.homeless_status)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                    
                })
                .catch(error => {
                    console.log( error.message )
                })

            }else{
                console.log("No chat selected yet")
            }
    
        },

        send_message(){

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofblanket_api/api/message/sendmessage.php"

            let message_info = {
                sender_id: this.current_user_id,
                receiver_id: other_user_id,
                msg: this.new_message,
                homeless_id: homeless_id
            }

            axios.get(api_endpoint, { 
                params: message_info
            })
            .then(response => {
                
                this.new_message = ''
                this.retrieve_message()
                
            })
            .catch(error => {
                console.log( error.message )
            })

        },
        updateComplete(){

            console.log('iam called')
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofblanket_api/api/homeless/updatehomelessstatus.php"

            let homeless = {
                id: homeless_id,
            }

            axios.get(api_endpoint, { 
                params: homeless
            })
            .then(response => {
                console.log(response)

                window.location.href = "chat.html?id=" + other_user_id + "&homelessid=" + homeless_id
                
            })
            .catch(error => {
                console.log( error.message )
            })

            
        },

    },
    beforeMount(){
        this.retrieve_users()
        this.get_chat_user()
        this.retrieve_message()
    },
    mounted(){
        this.update_messages()
    }

})

// Link this Vue instance with <div id="main">
vuemain.mount("#chat")