// Create a new Vue instance

const vuenavbar = Vue.createApp({

    // Data Properties
    data() {
        return {

            user_id: sessionStorage.getItem('userid'),
            username: sessionStorage.getItem('username')

        }
    },

    methods: {

        logout(){

            sessionStorage.removeItem('userid')
            sessionStorage.removeItem('username')
            console.log("I have logged out from "+this.user_id)
            window.location.href = "login.html"

        },
    
    },
});

vuenavbar.component('navbar-all',
{

    props: ['userid','username'],

    emits: ['log_out'],


    template: `

    <nav class="navbar navbar-expand-lg px-5">

        <!-- Navbar Logo -->
        <a class="navbar-brand active" href="index.html">RoofBlanket</a>
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
                Welcome {{username}}!
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

});

const vuefooter = Vue.createApp({

    // Data Properties

});

vuefooter.component('footer-all',
{

    template: `

    <!-- FOOTER -->
        <footer>
            <div class="waves">
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div>
            </div>
            <ul class="social_icon">
            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
            </ul>
            <ul class="menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Task List</a></li>
            <li><a href="#">Listing</a></li>
            <li><a href="#">Chat</a></li>
            </ul>
            <p>© 2022 RoofBlanket, Inc</p>
        </footer>
    `,


    methods: {
    },

    created(){

    }
});

// Link this Vue instance with <div id="main">
vuenavbar.mount("#navbardiv")
vuefooter.mount("#footerdiv")