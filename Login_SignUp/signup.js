document.getElementById("createAccount").addEventListener("click", getUserData)
async function getUserData() {
    // 1. You MUST define these variables first by grabbing the input values
    let Fname = document.getElementById("signUpFName").value;
    let Lname = document.getElementById("signUpLName").value;
    let email = document.getElementById("signUpEmail").value;
    let street = document.getElementById("signUpStreet").value;
    let city = document.getElementById("signUpCity").value;
    let state = document.getElementById("signUpState").value;
    let zipcode = document.getElementById("signUpZipcode").value;
    let phone = document.getElementById("signUpPhone").value;
    let password = document.getElementById("signUpPassword").value;

    // 2. Now 'Fname', etc., exist, so you can put them in an object
    let newUser = { Fname, Lname, email, street, city, state, zipcode, phone, password };

    // 3. Logic to save to LocalStorage (as we discussed previously)
    let users = JSON.parse(localStorage.getItem("allUsers")) || [];
    users.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(users));

    window.location.href = "login.html";
}