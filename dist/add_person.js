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
            new_duration:"",
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

        create_homeless_instance($lat_long){

            // check if password == confirm password

            console.log("this is lat long"+ $lat_long[0] + $lat_long[1])
            // check if all fields are filled 
            console.log(this.new_name)
            console.log(this.new_age)
            console.log(this.new_location)
            console.log(this.isSpecialNeeds)
            console.log(this.new_gender)
            console.log(this.new_employment)
            console.log(this.new_description)
            console.log(this.new_duration)

            if (this.new_name != '' & this.new_age != '' & this.new_location != '' & this.isSpecialNeeds != '' & 
            this.new_gender != '' & this.new_employment != '' & this.new_description != ''){

                console.log('iamin')

                // let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/user/registeruser.php"

                // let new_user = {

                //     firstname: this.new_firstname,
                //     lastname: this.new_lastname,
                //     username: this.new_username,
                //     email: this.new_email,
                //     password: this.new_password,

                // }

                // axios.get(api_endpoint, { 
                //     params: new_user
                // })
                // .then(response => {
                //     console.log( response.data )
                //     this.success_msg = "Account created successfully"

                //     this.error_msg = ""
                //     this.success_msg = ""
                //     window.location.href = "login.html"

                    
                // })
                // .catch(error => {
                //     console.log( error.message )
                //     this.error_msg = "Unable to create account"
                // })

                }

            else{
                console.log("empty fields")
            }

        }

    
    },
})

// Link this Vue instance with <div id="main">
vuemain.mount("#main")