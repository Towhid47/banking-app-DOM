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