// Data structure and dummy data for firebase db

import { collection, doc, setDoc } from "firebase/firestore"; 

// =====================================Samaritans data=====================================

const usersRef = collection(db, "samInfo");

/*
Data needed from samaritans, goodwill host, and employers (data must be collected in registration page):
*/

//Samaritan 1:
await setDoc(doc(usersRef, "JST"), {
    name: "John Smith Tan", 
    mobileNumber: "00000001",
    dateOfBirth: "19031999", // DDMMYYYY,
    username: "johnjon",
    password: "jon1thegoodb0y",
    email: "jstan@goggle.com",
    HomeAddress: "Pasir Ris Blk 1 Singapore 510001",  // estate + Block + PostalCode 
    housingType: "hdb 5-room", // dropdown menu in registration page?
    companyAddress: "Clementi blk 99 Singapore 120099",
    natureofBusiness: "fnb", // dropdown menu in registration page?
});

// =====================================Goodwill Host data=====================================

const homelessRef = collection(db, "goodwillInfo");

/*
Data needed from homeless people (data must be collected in post creation):
*/

//Homeless 1:
await setDoc(doc(homelessRef, "LWS"), {
    name: "Lee Wei Shoon", 
    mobileNumber: "10000201",
    dateOfBirth: "11031978", // DDMMYYYY,
    findingJob: "Y",
    skills: "cleaning, stockcount",
    duration: "3 months",
    specialNeeds: "N",
    description: "Middle aged male that has a tattoo of a sun on his right forearm. He is bald and wears a spectacle.",
});

//Homeless 2:
await setDoc(doc(homelessRef, "PPS"), {
    name: "Ping Pang Shoo", 
    mobileNumber: "00002001",
    dateOfBirth: "10021969", // DDMMYYYY,
    findingJob: "Y",
    skills: "Gardening, Cleaning",
    duration: "2 months",
    specialNeeds: "N",
    description: "Middle aged woman that with a yellow flower cap and wears a pink spectacle. Carries a red trolley.",
});