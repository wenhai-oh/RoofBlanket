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