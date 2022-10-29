<?php
  $servername = "localhost";
  $username = "id19698329_admin";
  $password = ">4pP)KjQ\?i6jYET";
  $database = "id19698329_roofblanketdb";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT * FROM homelessCollection";
  $result = $conn->query($sql);
  // print_r($result);

  $homelessCollectionArray = array();
  if ($result->num_rows > 0) {
      // output data of each row
      while ($row = $result->fetch_assoc()) {
          // echo "id: " . $row["ID"] . " - Name: " . $row["Name"] . " - Email" . $row["Email"] . "<br>";
          $id = $row["id"];
          $name = $row["name"];
          $location = $row["location"];
          $description = $row["description"];
          $homelessIndividualArray = array($id, $name, $location, $description);
          array_push($homelessCollectionArray, $homelessIndividualArray);
      }
  } else {
      echo "0 results";
  }
  $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Title For Current Page -->
  <title>Home Page</title>

  <!-- BOOTSTRAP CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

  <!-- Link To CSS Stylesheet -->
  <link rel="stylesheet" href="index.css">

  <!-- Vue CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>
<body id="index">

  <!--Sticky Top Nav Bar Section-->
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light px-5">

    <!-- Navbar Logo -->
    <a class="navbar-brand" href="#">RoofBlanket</a>
    <!-- End Of Navbar Logo -->

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Nav Bar Content -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <!--Nav Links-->
      <ul class="navbar-nav">
        <!--Call User's Profile Name-->
        <li class="navbar-text mx-5">
          Hello, Wai Soon
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Message</a>
        </li>
        <li class="nav-item" style="margin-right: 30px;">
          <a class="nav-link" href="#">Task List</a>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-outline-primary" href="login.html">Login</button>
        </li>
      </ul>
      <!-- End Of Nav Links-->

      

    </div>
    <!-- End Of Nav Bar Content -->
  </nav>
  <!-- End Of Sticky Top Nav Bar Section -->


  <!-- Start Of Body Content-->
  <div class="body-container my-5">

    <!-- STATISTICS -->
    <div class="container">
      <div class="row" style="width: 200px ; height: 200px;">
        <div class="col">
          <canvas id="grantedShelter" ></canvas>
        </div>
        <div class="col">
          <canvas id="receivedEmployment" ></canvas>
        </div>
        <div class="col">
          <canvas id="openCases" ></canvas>  
        </div>
        
      </div>
    </div>

    <!-- First Section -->
    <div class="container-fluid carousel_body mb-5">

      <!-- Start of Carousel -->
      <div id="slider" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          
          <div class="carousel-item active">
            <img class="d-block w-100 h-100" src="Images/Homeless_1.jpg" alt="First slide">
          </div>
          
          <div class="carousel-item">
            <img class="d-block w-100 h-100" src="Images/Homeless_2.jpg" alt="Second slide">
          </div>
          
          <div class="carousel-item">
            <img class="d-block w-100 h-100" src="Images/Homeless_3.jpg" alt="Third slide">
          </div>
        </div>

        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-target="#slider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only"></span>
        </a>

        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-target="#slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only"></span>
        </a>
      </div>
      <!-- End of Carousel -->
    </div>
    <!-- End Of First Section -->

    <!-- Start Of Second Section -->
    <div class="container-fluid">
      <!--Pills Nav-->
      <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">

        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" name="index_tab" value="shelter">Seeking Shelter</button>
        </li>

        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" name="index_tab" value="employment">Seeking Employment</button>
        </li>

      </ul>
      <!-- Control Of Content Change of Pills -->
      <div class="tab-content" id="pills-tabContent">

        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <!--Start of a New Row-->
          <div class="row mt-5">
            <!--Start of a New Col-->
            <!--<div class="col-12 col-xl-4">-->
              <!-- Start Of Card 1-->
            <!--  <div class="card">-->
            <!--    <img src="Images/Homeless_1.jpg" class="card-img-top" alt="...">-->
            <!--    <div class="card-body">-->
            <!--      <h5 class="card-title">Name: </h5>-->
            <!--      <h5 class="card-title">Location: </h5>-->
            <!--      <a href="#" class="btn btn-primary">More Info</a>-->
            <!--    </div>-->
            <!--  </div>-->
              <!--End Of Card 1-->
            <!--</div>-->
            
            <div class="col-12 col-xl-4" v-for="homeless of homeless_collection">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Name: {{ homeless[1] }} </h5>
                        <h5 class="card-title">Location: {{ homeless[2] }} </h5>
                        <a href="#" class="btn btn-primary" :value="homeless[0]">More Info</a>
                    </div>
                </div>
            </div>
            
          </div>
          <!-- End of Row-->
          
        </div>

        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <!--Start of a New Row-->
          <div class="row mt-5">
            <!--Start of a New Col-->
            <!--<div class="col-12 col-xl-4">-->
              <!-- Start Of Card 1-->
              <!--<div class="card">-->
              <!--  <img src="Images/Homeless_1.jpg" class="card-img-top" alt="...">-->
              <!--  <div class="card-body">-->
              <!--    <h5 class="card-title">Name: </h5>-->
              <!--    <h5 class="card-title">Location: </h5>-->
              <!--    <a href="#" class="btn btn-primary">More Info</a>-->
              <!--  </div>-->
              <!--</div>-->
              <!--End Of Card 1-->
            <!--</div>-->
            <div class="col-12 col-xl-4" v-for="homeless of homeless_collection">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Name: {{ homeless[1] }} </h5>
                        <h5 class="card-title">Location: {{ homeless[2] }} </h5>
                        <a href="#" class="btn btn-primary" :value="homeless[0]">More Info</a>
                    </div>
                </div>
            </div>
          </div>
          <!-- End of Row-->
        </div>

      </div>
      <!-- End Control Content Change of Pills -->
    </div>
    <!-- End Of Pills Tab -->

      

      


  </div>

  <!-- chart js script -->
  <script>
    // centerTextDoughnut plugin block
    const centerTextDoughnut = {
      id: 'centerTextDoughnut',
      afterDatasetsDraw(chart, args, pluginOptions) {
        const {ctx} = chart
        ctx.textAlign='center'
        ctx.font= 'bold 12px sans-serif'
        ctx.textBaseline = 'middle'
        const text = 10
        const textWidth = ctx.measureText(text).width
        const x = chart.getDatasetMeta(0).data[0].x
        const y = chart.getDatasetMeta(0).data[0].y
        ctx.fillText(text,x,y)
      }
    }
    // doughnut 1
    const labels = [
      'Granted Shelter',
      'Empty Space'
    ];
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['rgb(255, 99, 132)','rgb(255, 255, 255)', ],
        borderColor: 'rgb(255, 255, 255)',
        data: [10, 20, ],
      }]
    };
  
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Granted Shelter",
            position: 'bottom'
          },
          legend: {
            display: false
          }
        }
      },
      plugins: [centerTextDoughnut]
    };

    const myChart = new Chart(
      document.getElementById('grantedShelter'),
      config
    )
    // doughnut 2
    const labels2 = [
      'Received Employment',
      'Empty Space'
    ]

    const data2 = {
      labels: labels2,
      datasets: [{
        label: 'My second dataset',
        backgroundColor: ['rgb(255, 99, 132)','rgb(255, 255, 255)', ],
        borderColor: 'rgb(255, 255, 255)',
        data: [10, 20 ],
      }]
    }

    const config2 = {
      type: 'doughnut',
      data: data2,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Received Employment",
            position: 'bottom'
          },
          legend: {
            display: false
          }
        }
      },
      plugins: [centerTextDoughnut]
    };

    const myChart2 = new Chart(
      document.getElementById('receivedEmployment'),
      config2
    )

      // doughnut 3
    const labels3 = [
      'Open Cases',
      'Empty Space'
    ]

    const data3 = {
      labels: labels3,
      datasets: [{
        label: 'My third dataset',
        backgroundColor: ['rgb(255, 99, 132)','rgb(255, 255, 255)', ],
        borderColor: 'rgb(255, 255, 255)',
        data: [10, 20, ],
      }]
    };
  
    const config3 = {
      type: 'doughnut',
      data: data3,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Open Cases",
            position: 'bottom'
          },
          legend: {
            display: false
          }
        }
      },
      plugins: [centerTextDoughnut]
    };

    const myChart3 = new Chart(
      document.getElementById('openCases'),
      config3
    )
    
    // Vue.js Script
    const index = Vue.createApp({
        // Data Properties
        data() {
            return {
                // array of homeless people information [[name, location, description], [...]]
                homeless_collection: <?php echo json_encode($homelessCollectionArray); ?>
            }
        }
    })

    // Link this Vue instance with <div id="index">
    index.mount("#index")
  </script>

  <!-- <script src="bundle.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

  
</body>
</html>