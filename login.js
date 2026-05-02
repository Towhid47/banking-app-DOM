const userData = {mobileNumber: "01710728283", pin: "1234"};

const loginForm = document.querySelector('#login-form'); 

loginForm.addEventListener("submit", function(event){
     event.preventDefault();

     const mobileNumber = document.querySelector('#mobile-number').value;
     const pin = document.querySelector('#pin').value; 

        // Validate the inputs
        if(mobileNumber === userData.mobileNumber && pin === userData.pin){
            console.log(window.location.href = "/main.html");
        }
        else if(mobileNumber === "" || pin === ""){
            alert("Please fill in both fields.");
        }
        else{
            alert("Invalid mobile number or PIN. Please try again.");
        }
});