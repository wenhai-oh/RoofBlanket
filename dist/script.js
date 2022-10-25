// ****************************************************
// Start of Map Script
// ****************************************************
// mapListing portion
// dummy location
let dbLocationList = [[35.66962384382411, 139.6430907463442],[35.66976330016642, 139.64738591458215],[35.66962384382411, 139.6600996125663]]
let currentLocation = dbLocationList[0]
var mapListing = L.map('mapListing').setView(currentLocation, 13);
L.marker(currentLocation).addTo(mapListing)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapListing);

// mapUpdate portion
var mapUpdate = {}
var locationsList = []
 
function getLocation() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
        alert("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    mapUpdate = L.map('mapUpdate').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapUpdate);
    var marker = L.marker([latitude, longitude]).addTo(mapUpdate);
    marker.bindPopup("<p style=color:red;>You are here</p>").openPopup();

    var popup = L.popup();

    // Script for adding marker on map click
    mapUpdate.on('click', onMapClick);
}

function onMapClick(e) {
    var geojsonFeature = {
        "type": "Feature",
        "properties": {},
        "geometry":
        {
            "type": "Point",
            "coordinates": [e.latlng.lat, e.latlng.lng]
        }
    }

    var marker;

    L.geoJson(geojsonFeature, {
        pointToLayer: function(feature, latlng) {
                marker = L.marker(e.latlng, {
                title: "Location",
                alt: "Location",
                riseOnHover: true,
                // draggable: true,
            }).bindPopup("<input type='button' value='Remove' class='marker-delete-button'/>");

            marker.on("popupopen", onPopupOpen);
            return marker;
        }
    }).addTo(mapUpdate);

    // add location to list
    let location = [e.latlng.lat, e.latlng.lng]
    // console.log(location)
    locationsList.push(location)
    // console.log(locationsList)
}

// Function to handle delete as well as other events on marker popup open
function onPopupOpen() {
    var tempMarker = this;
    // console.log(tempMarker)
    // To remove marker on click of delete button in the popup of marker
    $(".marker-delete-button:visible").click(function() {
        mapUpdate.removeLayer(tempMarker);
        // remove from location list
        let lat = tempMarker["_latlng"].lat
        let long = tempMarker["_latlng"].lng
        let location = [lat, long]
        removeLatLng(location)
    });
}

// gets an array of latitude and longitude [x, y] and removes them from the location list array.
function removeLatLng(location) {
    for (index in locationsList)
    {
        if (locationsList[index][0] == location[0] && locationsList[index][1] == location[1])
        {
            // remove from array using index
            if (index > -1)
            {
                locationsList.splice(index, 1)
                console.log(locationsList)
            }
        }
    }
}
// ****************************************************
// End of Map Script
// ****************************************************

// ****************************************************
// Start of Profile.html Scripts
// ****************************************************
function displayEditProfileForm() {
    // show edit-profile-container, hide change-password-container
    // console.log("edit profile")
    let editProfileForm = document.getElementById("edit-profile-container")
    let changePasswordForm = document.getElementById("change-password-container")

    editProfileForm.style.display = "block"
    changePasswordForm.style.display = "none"

    // change colour of selected option
    let editProfileBtn = document.getElementById("edit-profile-btn")
    let changePasswordBtn = document.getElementById("change-password-btn")

    editProfileBtn.style.borderLeft = "3px solid black"
    editProfileBtn.style.paddingLeft = "4px"
    changePasswordBtn.style.paddingLeft = "7px"
    changePasswordBtn.style.borderLeft = "none"
}

function displayChangePasswordForm() {
    // show change-password-container, hide edit-profile-container
    // console.log("change password")
    let editProfileForm = document.getElementById("edit-profile-container")
    let changePasswordForm = document.getElementById("change-password-container")

    editProfileForm.style.display = "none"
    changePasswordForm.style.display = "block"

    // change colour of selected option
    let editProfileBtn = document.getElementById("edit-profile-btn")
    let changePasswordBtn = document.getElementById("change-password-btn")

    editProfileBtn.style.borderLeft = "none"
    editProfileBtn.style.paddingLeft = "7px"
    changePasswordBtn.style.paddingLeft = "4px"
    changePasswordBtn.style.borderLeft = "3px solid black"
}
// ****************************************************
// End of Profile.html Scripts
// ****************************************************