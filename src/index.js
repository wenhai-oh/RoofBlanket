import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, getDocs, get} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCwT9iZ3qSTvJMbifT2vCRtN0Oh-DBQQB4",
  authDomain: "roofblanket-1d109.firebaseapp.com",
  projectId: "roofblanket-1d109",
  storageBucket: "roofblanket-1d109.appspot.com",
  messagingSenderId: "493390931283",
  appId: "1:493390931283:web:70da0f4cf29b5212606da6"
};

// init firebase app
initializeApp(firebaseConfig)

// init services 
const db = getFirestore()

// collection ref 
const homelessRef = collection(db, 'homelessInfo')
const userRef = collection(db, 'usersInfo')
const chatRef = collection(db, 'chatInfo')


// ===================== CREATE BUTTONS ==========================

// image to Base64 in add_person.html
const fileInput = document.querySelector('#upload')
const addHomeless = document.querySelector('.form_content')
let base64Img = ""

// Listen for the change event so we can capture the file
if (fileInput != null) {
  fileInput.addEventListener('change', (e) => {
    // Get a reference to the file
    const file = e.target.files[0];
    if (file.size > 1048576) {
      alert("Image uploaded is too big. Please upload files lesser than 1MB")
      addHomeless.reset()
    }else{
      // Encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result)
        base64Img = reader.result
        // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
      }
    reader.readAsDataURL(file);
    }
  });
}

// Upload Button - add_person.html
if (addHomeless != null){
  addHomeless.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("====== START: SAVING HOMELESS POST TO FIRESTORE ======")
    console.log(base64Img)
    // ====== TROUBLESHOOT ======
    // retrieve_db(homelessRef)
    // console.log(document.getElementById("person_name").value)
    // console.log(document.getElementById("age").value)
    // console.log(document.getElementById("location").value)
    // console.log(document.getElementById("duration").value)
    // console.log(displayRadioValue("gender"))
    // console.log(displayRadioValue("specialneeds"))
    // console.log(displayRadioValue("employment"))
    // console.log(document.getElementById("description").value)
    
    // Uploading to firestore
    addDoc(homelessRef, {
      img: base64Img,
      name: document.getElementById("person_name").value,
      age: document.getElementById("age").value,
      location: document.getElementById("location").value,
      duration: document.getElementById("duration").value,
      gender: displayRadioValue("gender"),
      specialneeds: displayRadioValue("specialneeds"),
      employment: displayRadioValue("employment"),
      description: document.getElementById("description").value
    })
    .then(() => {
      console.log("====== END: SAVING HOMELESS POST TO FIRESTORE ======")
    })
  })   
}
  
// Create button - login.html for registration
const addUser = document.querySelector('.registerbutton')
if (addUser!= null) {
  addUser.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("====== START: SAVING NEW USER TO FIRESTORE ======")
    // ====== TROUBLESHOOT ======
    // retrieve_db(usersRef)
    // console.log(document.getElementById("newUsername").value)
    // console.log(document.getElementById("newEmail").value)
    // console.log(document.getElementById("newAddress").value)
    // console.log(document.getElementById("newPassword").value)
    // console.log(document.getElementById("newConfirmPassword").value)
    addDoc(userRef, {
      // Uploading to firestore
      username: document.getElementById("newUsername").value,
      email: document.getElementById("newEmail").value,
      address: document.getElementById("newAddress").value,
      password: document.getElementById("newPassword").value
    })
    .then(() => {
      closeRegister()
      console.log("====== END: SAVING NEW USER TO FIRESTORE ======")
    })
  })
} 

// Send Button function - chat.html
const addChat = document.querySelector(".sendBtn")
if (addChat != null) {
  addChat.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("====== START: SAVING CHAT MESSAGE TO FIRESTORE ======")
    // ====== TROUBLESHOOT ======
    // retrieve_db(chatRef)
    // console.log(addChat)
    // console.log(document.getElementById("chatMsg").value)
    addDoc(chatRef, {
      messages: document.getElementById("chatMsg").value
    })
    .then(() => {
      console.log("====== END: SAVING CHAT MESSAGE TO FIRESTORE ======")
      // Clearing has error but don't need to as it should redirect to another page/ 
    })
  })
}


// ===================== DELETE BUTTONS ==========================
// Release button - task_list.html
const deleteHomeless = document.querySelector("homelessList")
if (deleteHomeless != null ) {
  e.preventDefault()
  console.log("====== START: DELETING HOMELESS POST TO FIRESTORE ======")

  // obtain id but i think i have to call the obj into the task_list first
  // input id as third param
  const delhomelessRef = doc(db, 'homelessInfo', "id")
  deleteDoc(delhomelessRef)
  .then(() => {
    // sth
    console.log("====== END: DELETING HOMELESS POST TO FIRESTORE ======")
  })
}

// ====================== UPDATE BUTTONS =================
// Update button - listing.html
// custom notes and web location 


// Save changes button - profile.html
// username, firstName, LastName, Email



// Create Employment opportunity button
// retrieve information from db then append to person


// ================ FIRESTORE DB DATA RETRIEVAL =================
// task_list.html
let tasklist = document.getElementById("tasklist")
let index = document.getElementById("index") 


// console.log(window.location.href)
// query for employment tab in index.html
const employmentQuery = query(homelessRef, where("employment", "==", "yes"))

if(tasklist != null) {
  console.log("You are in task_list.html")
  // retrieveHomeless()

}else if (index != null) {
  console.log("You are in index.html")
  // Tabs in index.html
  let seekingShelterObj = document.getElementsByName("index_tab")[0]
  let seekingEmploymentObj = document.getElementsByName("index_tab")[1]
  
  window.onload = (e) => {
    e.preventDefault()
    console.log("index.html is loading for the first time")
    // retrieve db of all homeless here
    retrieve_db(homelessRef)
    console.log(homelessInfo)
    console.log(typeof(homelessInfo))
    console.log(JSON.stringify(homelessInfo))

  }
  seekingShelterObj.addEventListener("click", (e) => {
    console.log("SeekingShelter is clicked")
    // retrieve db of all homeless here
  })
  seekingEmploymentObj.addEventListener("click", (e) => {
    console.log("SeekingEmployment is clicked")
    // retrieve db of all homeless seeking employment here
  })

  console.log(document.getElementsByName("index_tab")[0])

}

// ============= FUNCTIONS =============
// For troubleshooting to check firestore DB
let homelessInfo = []
function retrieve_db(reference) {
  onSnapshot(reference, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        homelessInfo.push({...doc.data(), id: doc.id})
      })
  })
}

function closeRegister() {
  register.classList.remove('open-visible')
  main.classList.remove('blur')
}

function displayRadioValue(radio_name) {
  var ele = document.getElementsByName(radio_name);
  for(let i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        return ele[i].value
      }
  }
}


// getDocs(homelessRef)
//   .then((snapshot) => {
//     let homelessObjList = []
//     snapshot.docs.forEach((doc) => {
//       homelessObjList.push({ ... doc.data(), id: doc.id })
//     })
//     console.log(homelessObjList)
//   })


// Vue Data
const app = Vue.createApp({
  data(){
    return{
      // data
    }
  },
  
  methods: {
    // methods
  }
  
});
