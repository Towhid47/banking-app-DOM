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


// By default, hide all feature details on the main page
const allFeatureDetails = document.querySelectorAll('.feature-details');
for(let featureDetail of allFeatureDetails){
    featureDetail.classList.add("hidden");  
}


// toggle feature details when a feature option is clicked

const featuresParent = document.querySelector('#features-parent');
featuresParent.addEventListener('click', function(event){    //event delegation method used here to handle click events on feature options

    for(let featureDetail of allFeatureDetails){
        if(featureDetail.children[0].innerText === event.target.children[1].innerText){ // check if the clicked feature option's text matches the feature detail's title 
            featureDetail.classList.remove("hidden"); 
      
            const featureDetailsContainer = document.querySelector('#feature-details-container');
            featureDetailsContainer.classList.remove("hidden");  
        }
        else{
            featureDetail.classList.add("hidden");
        }
    } 
});     


//Function to store transaction details in Local Storage
function storeTransactionDetails(transactionDetails){
    let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || []; // get existing transaction history from local storage or initialize an empty array if it doesn't exist
    transactionHistory.push(transactionDetails); // add new transaction details to the transaction history array
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory)); // update transaction history in local storage with new transaction details 
}



// Handle add money form submission 
const addMoneyForm = document.querySelector('#add-money-form');

addMoneyForm.addEventListener('submit', function(event){
    event.preventDefault(); // prevent form from submitting and refreshing the page

    const selectedBank = event.target.bank.value; // get selected bank value
    const accountNumber = event.target.accountNumber.value; // get account number value
    const amountToAdd = parseFloat(event.target.amount.value); // get amount to add value and convert it to a number
    const pin = event.target.pin.value; // get pin value

   // validate account number 
        // regex to check if account number contains any letters or special characters, it should only contain numbers 
        const regex = /^(?=.*[A-Za-z\W])[A-Za-z0-9\W]+$/;

        if(regex.test(accountNumber)){
          alert("Account number must contain only numbers");
            event.target.accountNumber.value = '';
          return;
       }

       if(accountNumber.length < 10 || accountNumber.length > 20){
        alert("Account number must be between 10 and 20 digits");  
        event.target.accountNumber.value = '';
        return; 
      }
    
   // validate amount to add
    if(amountToAdd <= 0){
        alert("Amount to add must be greater than 0");
        event.target.amount.value = '';
        return; 
    };
       // regex to check if account number contains any letters or special characters, it should only contain numbers 
        if(regex.test(event.target.amount.value)){
            alert("Amount to add must contain only numbers");
            event.target.amount.value = '';
            return;
        }
    
    // validate pin
    if(pin !== userData.pin){
       alert("Invalid PIN");
       event.target.pin.value = '';
       return; 
    }

    // Add Money to user's balance
    userData.balance += amountToAdd; 
    document.querySelector('#balance').textContent = userData.balance.toFixed(2); //display updated user balance
    localStorage.setItem('userData', JSON.stringify(userData)); //update user data in local storage with new balance  
    
    // Clear form inputs after successful submission
    event.target.bank.value = '';
    event.target.accountNumber.value = '';
    event.target.amount.value = '';
    event.target.pin.value = '';
    
    // Time of successful transaction
    const transactionTime = new Date().toLocaleString(); // get current date and time in a readable format

   
    // Gather all the details of the transaction to Store in Local Storage
    const transactionDetails = {
        type: 'Add Money',
        amount: amountToAdd.toFixed(2),
        bank: selectedBank,
        accountNumber: accountNumber,
        time: transactionTime
    };

    // Store transaction details in Local Storage 
    storeTransactionDetails(transactionDetails); 
    
}); 


// for testing purposes, to check if transaction details are being stored in local storage correctly
const transaction =  JSON.parse(localStorage.getItem('transactionHistory')); 

console.log(transaction);