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
            homeless_status: '',
            homeless_id: '',
            status: ''
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

            this.homeless_id = params.homelessid

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

                let api_endpoint2 = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/gethomelessinfobyid.php"


                let homeless = {
                    id: homeless_id
                }
                axios.get(api_endpoint2,{
                    params: homeless
                }).then(response =>{

                    console.log(response)
                    completed = response.data.records[0].completed
                    referral_id = response.data.records[0].referral_id
                    home_offered_by = response.data.records[0].home_offered_by
                    
                    // get referrer ID
                    // get offer_home
                    
                    if (referral_id == this.current_user_id){

                        if (home_offered_by == other_user_id){

                            if (completed == 1){
                                this.status = "completed"
                            }
                            else{
                                this.status = "pending acknowledgement"
                            }
                        }
                        else{
                            this.status = "no offer"
                        }
                    }
                    else{

                        
                        if (home_offered_by == this.current_user_id){
                            if (completed == 1){
                                this. status = "completed"
                            }else{
                            this.status = "pending confirmation"}
                        }
                        else if (home_offered_by == null){
                            this.status = "available"
                        }
                        else{
                            this.status = "deal in progress"
                        }

                    }
                    console.log(this.status)


                }).catch(error=>{

                })
                
            })
            .catch(error => {
                console.log( error.message )
            })
        },

        update_messages(){

            setInterval(() => {
                
            
                const params = new Proxy(new URLSearchParams(window.location.search), {
                    get: (searchParams, prop) => searchParams.get(prop),
                  });
                let other_user_id = params.id; // "some_value"
                let homeless_id = params.homelessid;
    
                this.homeless_id = params.homelessid
    
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
    
                    let api_endpoint2 = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/gethomelessinfobyid.php"
    
    
                    let homeless = {
                        id: homeless_id
                    }
                    axios.get(api_endpoint2,{
                        params: homeless
                    }).then(response =>{
    
                        console.log(response)
                        completed = response.data.records[0].completed
                        referral_id = response.data.records[0].referral_id
                        home_offered_by = response.data.records[0].home_offered_by
                        
                        // get referrer ID
                        // get offer_home
                        
                        if (referral_id == this.current_user_id){
    
                            if (home_offered_by == other_user_id){
    
                                if (completed == 1){
                                    this.status = "completed"
                                }
                                else{
                                    this.status = "pending acknowledgement"
                                }
                            }
                            else{
                                this.status = "no offer"
                            }
                        }
                        else{
    
                            
                            if (home_offered_by == this.current_user_id){
                                if (completed == 1){
                                    this. status = "completed"
                                }else{
                                this.status = "pending confirmation"}
                            }
                            else if (home_offered_by == null){
                                this.status = "available"
                            }
                            else{
                                this.status = "deal in progress"
                            }
    
                        }
                        console.log(this.status)
    
    
                    }).catch(error=>{
    
                    })
                    
                })
                .catch(error => {
                    console.log( error.message )
                })


        }, 5000)},

        retrieve_users() {
            console.log("=== i am calling some function here() ===")

            // Check API documentation at: https://roof-blanket.000webhostapp.com/krazypeople/

            // YOU MAY NEED TO MODIFY THIS
            // based on your local computer setting
            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/message/getchatuser.php"


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
            this.homeless_id = homeless_id
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

                let api_endpoint2 = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/gethomelessinfobyid.php"

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

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/message/sendmessage.php"

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

        // give referrer the opportunity to accept an offer

        updateComplete(){

            console.log('iam called')
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/updatehomelessstatus.php"

            let homeless = {
                id: homeless_id,
                task: "acceptoffer"
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

        // give goodwill host opportunity to offer their home
        offerHome(){

            console.log('iam called')
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/updatehomelessstatus.php"

            let homeless = {
                id: homeless_id,
                host_id: this.current_user_id,
                task: "offerhome"

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

        // give referrer  the opporunity to reject the host
        rejectOffer(){

            console.log('iam called')
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/updatehomelessstatus.php"

            let homeless = {
                id: homeless_id,
                task: "rejectoffer"
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

        // give goodwill host the opportunity to retract their offer
        retractOffer(){

            console.log('iam called')
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
            let other_user_id = params.id; // "some_value"
            let homeless_id = params.homelessid;

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/updatehomelessstatus.php"

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