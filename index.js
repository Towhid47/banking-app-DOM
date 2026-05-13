// Get user data from local storage
const userData = JSON.parse(localStorage.getItem('userData'));


// Display user data on the main page
let userNameElement = document.querySelector('#user-name');
if(userData?.username){
    userNameElement.textContent = `Welcome, ${userData.username}!`;
}
// Display balance 
let balanceElement = document.querySelector('#balance');
if(userData?.balance){
    balanceElement.textContent = userData.balance.toFixed(2);
}


// Handle logout
const logoutButton = document.querySelector('#logout-btn');

logoutButton.addEventListener('click', function(){
    // // Clear user data from local storage
    localStorage.removeItem('userData');

    // // Redirect to login page
    window.location.href = "/login.html";
});

//if there is no user data in local storage, redirect to login page
if(!userData){
    window.location.href = "/login.html";
}