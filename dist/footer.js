// Create a new Vue instance

const vuenavbar = Vue.createApp({

    // Data Properties
    data() {
        return {

            user_id: sessionStorage.getItem('userid')

        }
    },

    methods: {

        logout(){

            sessionStorage.removeItem('userid')
            console.log("I have logged out from "+this.user_id)
            window.location.href = "login.html"

        },
    
    },
});

vuenavbar.component('navbar-all',
{

    props: ['userid'],

    emits: ['log_out'],


    template: `

    <nav class="navbar navbar-expand-lg px-5">

        <!-- Navbar Logo -->
        <a class="navbar-brand active" href="new_index.html">RoofBlanket</a>
        <!-- End Of Navbar Logo -->

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav Bar Content -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <!--Nav Links-->
            <ul class="navbar-nav">
                <!--Call User's Profile Name-->
                <li class="navbar-text mx-5">
                Welcome!
                </li>
                <li class="nav-item">
                <a class="nav-link" href="profile.html">Profile</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="chat.html">Chat</a>
                </li>
                <li class="nav-item" style="margin-right: 30px;">
                <a class="nav-link" href="task_list.html">Task List</a>
                </li>
                <li class="nav-item">
                  <a href="login.html" v-if="userid != null">
                    <button type="button" class="btn" v-on:click="$emit('log_out')">Log Out</button>
                  </a>

                  <a href="login.html" v-else>
                    <button type="button" class="btn">Login</button>
                  </a>

                </li>
            </ul>
        <!-- End Of Nav Links-->
        </div>
    <!-- End Of Nav Bar Content -->
    </nav>
    `,


    methods: {
        // changePict(){
        //     // TODO: insert code
        //     // hint: use setTimeout

        //     console.log("BOOYAH")

        //     if (this.current_image_src == this.src1){
        //         this.current_image_src = this.src2
        //     }else{
        //         this.current_image_src = this.src1
        //     }
            


        // }
    },
    

    created(){

    }
});

const vuefooter = Vue.createApp({

    // Data Properties
    data() {
        return {

            user_id: sessionStorage.getItem('userid')

        }
    },

    methods: {

        logout(){

            sessionStorage.removeItem('userid')
            console.log("I have logged out from "+this.user_id)
            window.location.href = "login.html"

        },
    
    },
});

vuefooter.component('footer-all',
{

    props: ['userid'],

    emits: ['log_out'],


    template: `

    <nav class="navbar navbar-expand-lg px-5">

        <!-- Navbar Logo -->
        <a class="navbar-brand active" href="new_index.html">RoofBlanket</a>
        <!-- End Of Navbar Logo -->

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav Bar Content -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <!--Nav Links-->
            <ul class="navbar-nav">
                <!--Call User's Profile Name-->
                <li class="navbar-text mx-5">
                Welcome!
                </li>
                <li class="nav-item">
                <a class="nav-link" href="profile.html">Profile</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="chat.html">Chat</a>
                </li>
                <li class="nav-item" style="margin-right: 30px;">
                <a class="nav-link" href="task_list.html">Task List</a>
                </li>
                <li class="nav-item">
                  <a href="login.html" v-if="userid != null">
                    <button type="button" class="btn" v-on:click="$emit('log_out')">Log Out</button>
                  </a>

                  <a href="login.html" v-else>
                    <button type="button" class="btn">Login</button>
                  </a>

                </li>
            </ul>
        <!-- End Of Nav Links-->
        </div>
    <!-- End Of Nav Bar Content -->
    </nav>
    `,


    methods: {
    },

    created(){

    }
});

// Link this Vue instance with <div id="main">
vuenavbar.mount("#navbardiv")
vuefooter.mount("#footerdiv")