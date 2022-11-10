// Create a new Vue instance

const vuemain = Vue.createApp({

    // Data Properties
    data() {
        return {

            incomplete_homeless_array: [],
            jobless_homeless_array: [],
        }
    },

    methods: {


        retrieve_homeless() {
            console.log("=== i am calling some function here() ===")

            let api_endpoint = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/getincompletehomeless.php"


            axios.get(api_endpoint)
            .then(response => {

                this.incomplete_homeless_array = []

                this.incomplete_homeless_array = response.data.records

                console.log(response.data.records)


                let api_endpoint2 = "https://roof-blanket.000webhostapp.com/roofBlanket_api/api/homeless/getjoblesshomeless.php"


                axios.get(api_endpoint2)
                .then(response => {
    
                    this.jobless_homeless_array = []
    
                    this.jobless_homeless_array = response.data.records
                    console.log(response.data.records)
    
                })
                .catch(error => {
                    console.log( error.message )
                })


            })
            .catch(error => {
                console.log( error.message )
            })
        },

    },
    mounted(){
        this.retrieve_homeless()
        // this.retrieve_jobless_homeless()

    }

})

// Link this Vue instance with <div id="main">
vuemain.mount("#card_list_content")