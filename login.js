import { usersData } from "./data.js"; 

const loginForm = document.querySelector('#login-form'); 

loginForm.addEventListener("submit", function(event){
     event.preventDefault();

     const mobileNumberInput = document.querySelector('#mobile-number').value;
     const pinNumberInput = document.querySelector('#pin').value; 

     //get user data according to input
     let userData = usersData.find(user => user.mobileNumber === mobileNumberInput && user.pin === pinNumberInput);

        if(userData){
            // Store logged-in user data in local storage for later use in main page     
               localStorage.setItem('userData', JSON.stringify(userData));
               
            // Navigate to main page if user data is found, otherwise show an error message    
            window.location.href = "/main.html";            
        }
        else{
            alert("Invalid mobile number or PIN. Please try again.");
            document.querySelector('#mobile-number').value = '';
            document.querySelector('#pin').value = '';
        }
});


//if userData on local storage exist, then user can't access login page  ...
// To apply this implementation: 
// step 1 : placed <script src="login.js"></script> to the <head> of login.html //By placing it here, the browser will redirect the user before the login.. even if it rendered on the screen.
// step 2 : window.location.replace() ... it Overwrites the current page in the session history. This effectively "forgets" the login page existed, so clicking "Back" from main.html won't bring them back to the login screen.   

const isAuthenticated = localStorage.getItem('userData');

if(isAuthenticated){
    window.location.replace('main.html');     
}