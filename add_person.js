// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {

            duration_values: [1,2,3,4,5,6,7,8,9,10,11,12],


            // new_name: "",
            // new_age: "",
            // isSpecialNeeds: "",
            // new_gender: "",
            // new_duration:"",
            // new_employment: "",
            // new_description: "",
            // location: {}
            // // new_name: "",
            // // new_name: "",
            // // new_name: "",
            
            

        }
    }
})

// Link this Vue instance with <div id="main">
vuemain.mount("#main")