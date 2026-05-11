import { usersData } from "./data.js"; 

const loginForm = document.querySelector('#login-form'); 

loginForm.addEventListener("submit", function(event){
     event.preventDefault();

     const mobileNumberInput = document.querySelector('#mobile-number').value;
     const pinNumberInput = document.querySelector('#pin').value; 

     //get user data according to input
     let userData = usersData.find(user => user.mobileNumber === mobileNumberInput && user.pin === pinNumberInput);

    // Navigate to main page if user data is found, otherwise show an error message 
        if(userData){
            window.location.href = "/main.html";
        }
        else{
            alert("Invalid mobile number or PIN. Please try again.");
        }
});




