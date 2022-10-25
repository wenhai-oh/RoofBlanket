// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, 
  addDoc, deleteDoc, doc,
  query, where,
  orderBy
} from 'firebase/firestore'

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

//Query formats
const q = query(homelessRef, where("name", "==", "jia ler"))

// real time collection data
// getDocs(homelessRef)
//     .then((snapshot) => {
//       // console.log(snapshot.docs)
//       console.log("=== fetch data ===")
//       let homelessInfo = []
//       snapshot.docs.forEach((doc) => {
//         console.log({...doc.data(), id: doc.id})
//         homelessInfo.push({...doc.data(), id: doc.id})
//       })
//       console.log("final list")
//       console.log(homelessInfo)

//       for (let obj of homelessInfo){
//         console.log(obj.name)
//       }

//     })
//     .catch( err => {
//       console.log(err.message)
//     })

// return all database of homeless Ref
// onSnapshot(homelessRef, (snapshot) => {
//   let homelessInfo = []
//     snapshot.docs.forEach((doc) => {
//       homelessInfo.push({...doc.data(), id: doc.id})
//     })
//     console.log(homelessInfo)
// })

// =====================BUTTONS==========================

// Upload Button function - add_person.html
// Name, age, location, duration, gender, specialNeeds, seekingEmployment, Description
const addHomeless = document.querySelector('.form_content')
if (addHomeless != null){
  addHomeless.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("====== START: SAVING HOMELESS POST TO FIRESTORE ======")
    console.log(addHomeless)
    // return all database of homeless Ref
    onSnapshot(homelessRef, (snapshot) => {
      let homelessInfo = []
        snapshot.docs.forEach((doc) => {
          homelessInfo.push({...doc.data(), id: doc.id})
        })
        console.log(homelessInfo)
})
    // Functions
    // Convert to base64 
    function encodeImageFileAsURL(element) {
      let file = element.files[0];
      let reader = new FileReader();
      reader.onloadend = function() {
        console.log(reader.result)
        return(reader.result)
      }
      reader.readAsDataURL(file);
    }
    
    // uploadBytes(homelessRef, file).then
  
    function displayRadioValue(radio_name) {
      var ele = document.getElementsByName(radio_name);
      for(let i = 0; i < ele.length; i++) {
          if(ele[i].checked){
            return ele[i].value
          }
      }
    }
  
    // user inputs console logging
    console.log(encodeImageFileAsURL(document.getElementById("upload")))
    console.log(document.getElementById("person_name").value)
    console.log(document.getElementById("age").value)
    console.log(document.getElementById("location").value)
    console.log(document.getElementById("duration").value)
    console.log(displayRadioValue("gender"))
    console.log(displayRadioValue("specialneeds"))
    console.log(displayRadioValue("employment"))
    console.log(document.getElementById("description").value)
  
    // Uploading to firestore
    addDoc(homelessRef, {
      // base64img: encodeImageFileAsURL(document.getElementById("upload")),
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
      // Clearing has error but don't need to as it should redirect to another page/ 
    })
  }) 
}



// Create button - login.html for registration
// username, email, address, password, confirm password

const addUser = document.querySelector('.registerbutton')
console.log(addUser)
// if (addUser != null){
  addUser.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("====== START: SAVING NEW USER TO FIRESTORE ======")
    
    console.log(document.getElementById("newUsername").value)
    console.log(document.getElementById("newEmail").value)
    console.log(document.getElementById("newAddress").value)
    console.log(document.getElementById("newPassword").value)
    console.log(document.getElementById("newConfirmPassword").value)
    

    addDoc(userRef, {
      // values
      // username: document.getElementById("newUsername").value,
      // email: document.getElementById("newEmail").value,
      // address: document.getElementById("newAddress").value,
      // password: document.getElementById("newPassword").value
    })
  })
// }

addUser.addEventListener

// Send Button function - chat.html
// Sender chats, receiver chats 
// Maybe can hardcode this 
// const addChat = document.querySelector(".sendMessage")
// addChat.addEventListener('button', (e) => {
//   e.preventDefault()
//   console.log(addChat)
// })

// Update button - listing.html
// custom notes and web location 


// Save changes button - profile.html
// username, firstName, LastName, Email

// Create Employment opportunity button
// username, email, address, password, confirmPassword


// Release button - task_list.html

// const deleteHomeless = document.querySelector('.delete')
// deleteHomeless.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const docRef = doc(db, 'homelessInfo', deleteHomeless.id.value)
  
//   deleteDoc(docRef)
//     .then(() => {
//       deleteHomeless.reset()
//     })
// })


// // deleting new person
// const deleteHomeless = document.querySelector('.delete')
// deleteHomeless.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const docRef = doc(db, 'homelessInfo', deleteHomeless.id.value)
  
//   deleteDoc(docRef)
//     .then(() => {
//       deleteHomeless.reset()
//     })
// })