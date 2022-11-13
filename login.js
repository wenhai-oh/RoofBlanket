// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {


            username: "",
            password: "",

            logged_in_user: "",


            login_error_msg: "",
            registration_error_msg: "",

            new_firstname: "",
            new_lastname: "",
            new_username: "",
            new_email: "",
            new_password: "",
            new_confirm_password: "",

            success_msg: ""

        }
    },

    

    // created: function() {
    //     console.log("=== created ===")

    //     // Do you need to do anything here so that
    //     // when activity2.html loads for the first time
    //     // <table> shows all messages from the API?
    //     // HINT: Did you already implement this method?
    //     //       This method retrieves all messages from API
    //     //       and makes the data available in a Data Property
    //     //       that <table> relies on.
    // },


    methods: {

        login(){

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/user/authenticate_login.php"

            let login_details = {
                username: this.username,
                password: this.password
            }

            axios.get(api_endpoint, { 
                params: login_details
            })
            .then(response => {
                console.log( response.data )
                user_id = response.data.records[0].id
                username = response.data.records[0].username
                console.log(username)
                console.log(user_id)
                sessionStorage.setItem("userid", user_id);
                sessionStorage.setItem("username", username)
                this.login_error_msg = ""
                window.location.href = "index.html"
                
            })
            .catch(error => {
                console.log( error.message )
                this.login_error_msg = "Invalid Username/Password"
            })


        },

        register_user(){

            // check if password == confirm password

            // check if all fields are filled 

            if (this.new_firstname != '' & this.new_lastname != '' & this.new_username != '' & this.new_email != '' & 
            this.new_password != '' & this.new_password == this.new_confirm_password){


                let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/user/registeruser.php"

                let new_user = {

                    firstname: this.new_firstname,
                    lastname: this.new_lastname,
                    username: this.new_username,
                    email: this.new_email,
                    password: this.new_password,

                }

                axios.get(api_endpoint, { 
                    params: new_user
                })
                .then(response => {
                    console.log( response.data )
                    this.success_msg = "Account created successfully"

                    this.registration_error_msg = ""
                    this.success_msg = ""
                    window.location.href = "login.html"

                    
                })
                .catch(error => {
                    console.log( error.message )
                    this.registration_error_msg = "Unable to create account"
                })

                }

            else{
                this.registration_error_msg = "Invalid registration details "
            }

        }

    
    },
})

// Link this Vue instance with <div id="main">
vuemain.mount("#loginpage")