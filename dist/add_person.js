// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {




            duration_values: [1,2,3,4,5,6,7,8,9,10,11,12],


            new_name: "",
            new_age: "",
            new_location: "",
            isSpecialNeeds: "",
            new_gender: "",
            new_employment: "",
            new_description: "",
            // new_name: "",
            // new_name: "",
            // new_name: "",
            
            

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

        create_homeless_instance(){

            // check if password == confirm password

            // check if all fields are filled 

            if (this.new_firstname != '' & this.new_lastname != '' & this.new_username != '' & this.new_email != '' & 
            this.new_password != '' & this.new_password == this.new_confirm_password){


                let api_endpoint = "http://localhost/roofBlanket_api/api/user/registeruser.php"

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

                    this.error_msg = ""
                    this.success_msg = ""
                    window.location.href = "login.html"

                    
                })
                .catch(error => {
                    console.log( error.message )
                    this.error_msg = "Unable to create account"
                })

                }

            else{
                this.error_msg = "Invalid registration details "
            }

        }

    
    },
})

// Link this Vue instance with <div id="main">
vuemain.mount("#main")