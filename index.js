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

// Handle cash out form submission
const cashOutForm = document.querySelector('#cash-out-form');

cashOutForm.addEventListener('submit', function(event){
    event.preventDefault(); // prevent form from submitting and refreshing the page
    
    let agentNumber = event.target.agentNumber.value; // get agent number value
    let amountToWithdraw = parseFloat(event.target.amount.value); // get amount to withdraw value and convert it to a number
    let pin = event.target.pin.value; // get pin value

    // validate agent number
        // regex to check if account number contains any letters or special characters, it should only contain numbers 
        const regex = /^(?=.*[A-Za-z\W])[A-Za-z0-9\W]+$/;

        if(regex.test(agentNumber)){
          alert("Agent number must contain only numbers");
            event.target.agentNumber.value = '';
          return;
       }

       if(agentNumber.length < 10 || agentNumber.length > 20){
        alert("Agent number must be between 10 and 20 digits");  
        event.target.agentNumber.value = '';
        return; 
      }

    // validate amount to withdraw
    if(amountToWithdraw <= 0){
        alert("Amount to withdraw must be greater than 0");
        event.target.amount.value = '';
        return; 
    };
       // regex to check if account number contains any letters or special characters, it should only contain numbers 
        if(regex.test(event.target.amount.value)){
            alert("Amount to withdraw must contain only numbers");
            event.target.amount.value = '';
            return;
        }
    
    // validate pin
    if(pin !== userData.pin){
       alert("Invalid PIN");
       event.target.pin.value = '';
       return; 
    }
    
    // Check if user has sufficient balance to withdraw the requested amount
    if(amountToWithdraw > userData.balance){
        alert("Insufficient balance to withdraw the requested amount");
        event.target.amount.value = '';
        return; 
    }

    // Withdraw money from user's balance
    userData.balance -= amountToWithdraw; 
    document.querySelector('#balance').textContent = userData.balance.toFixed(2); //display updated user balance
    localStorage.setItem('userData', JSON.stringify(userData)); //update user data in local storage with new balance 

    // Clear form inputs after successful submission
    event.target.agentNumber.value = '';
    event.target.amount.value = '';
    event.target.pin.value = '';

    // Time of successful transaction
    const transactionTime = new Date().toLocaleString(); // get current date and time in a readable format

    // Gather all the details of the transaction to Store in Local Storage
    const transactionDetails = {
        type: 'Cash Out',
        amount: amountToWithdraw.toFixed(2),
        agentNumber: agentNumber,
        time: transactionTime
    };

    // Store transaction details in Local Storage  
    storeTransactionDetails(transactionDetails); 

});


// Handle Transfer Money form submission
const transferMoneyForm = document.querySelector('#transfer-money-form');

transferMoneyForm.addEventListener('submit', function(event){
    event.preventDefault(); // prevent form from submitting and refreshing the page

    let recipientsAccountNumber = event.target.recipients_Account_Number.value; // get user account number value
    let amountToTransfer = parseFloat(event.target.amount.value); // get amount to transfer value and convert it to a number
    let pin = event.target.pin.value; // get pin value

    // validate recipients account number
        // regex to check if account number contains any letters or special characters, it should only contain numbers 
        const regex = /^(?=.*[A-Za-z\W])[A-Za-z0-9\W]+$/;

        if(regex.test(recipientsAccountNumber)){
          alert("Recipients account number must contain only numbers");
            event.target.recipients_Account_Number.value = '';
          return;
       }

       if(recipientsAccountNumber.length < 10 || recipientsAccountNumber.length > 20){
        alert("Recipients account number must be between 10 and 20 digits");  
        event.target.recipients_Account_Number.value = '';
        return; 
      }

    // validate amount to transfer
    if(amountToTransfer <= 0){
        alert("Amount to transfer must be greater than 0");
        event.target.amount.value = '';
        return; 
    };
       // regex to check if account number contains any letters or special characters, it should only contain numbers 
        if(regex.test(event.target.amount.value)){
            alert("Amount to transfer must contain only numbers");
            event.target.amount.value = '';
            return;
        }
    
    // validate pin
    if(pin !== userData.pin){
       alert("Invalid PIN");
       event.target.pin.value = '';
       return; 
    }

     // Check if user has sufficient balance to transfer the requested amount
    if(amountToTransfer > userData.balance){
        alert("Insufficient balance to transfer the requested amount");
        event.target.amount.value = '';
        return; 
    }

    // Reduce money from user's balance
    userData.balance -= amountToTransfer; 
    document.querySelector('#balance').textContent = userData.balance.toFixed(2); //display updated user balance
    localStorage.setItem('userData', JSON.stringify(userData)); //update user data in local storage with new balance 
    
    // Time of successful transaction
    const transactionTime = new Date().toLocaleString(); // get current date and time in a readable format

     // Clear form inputs after successful submission
    event.target.recipients_Account_Number.value = '';
    event.target.amount.value = '';
    event.target.pin.value = '';

    // Gather all the details of the transaction to Store in Local Storage
    const transactionDetails = {
        type: 'Transfer Money',
        amount: amountToTransfer.toFixed(2),
        recipientsAccountNumber:  recipientsAccountNumber,
        time: transactionTime
    };

   // Store transaction details in Local Storage  
    storeTransactionDetails(transactionDetails); 
    
});

// Bonus Coupon Code Form Submission Section
import {availableCoupons} from './couponsData.js'; 

   // Keep track of applied coupons so that user cannot apply the same coupon multiple times
     const usedCoupons = new Set();  // Set() data structure is a Constructor function or Built in Class , that create an empty Object and assign to usedCoupons... usedCoupons variable is used to store used coupons because it only allows unique values, so if user tries to apply the same coupon again, it will not be added to the set and we can check if a coupon has already been used by checking if it exists in the set
     
     //Submit form to get bonus coupon code
     const getBonusCouponForm = document.querySelector('#bonus-form');

     getBonusCouponForm.addEventListener('submit', function(event){
       event.preventDefault();  
       
       // get coupon code input element
       let enteredCode = event.target.coupon_code.value.replace(/\s+/g, '').toUpperCase(); // here, replace(/\s+/g, '') method is used to remove All whitespace from the entered coupon code  
       
       //Validate entered coupon code
            // Check if the entered coupon code is empty
            if (enteredCode === "") {
                    alert("Please enter a code.");
                    return;
                }
            
            // Check if the entered coupon code already in usedCoupons set, if it is, show an alert and return from the function to prevent applying the same coupon multiple times
            if (usedCoupons.has(enteredCode)) {                //here, has() method of Set() is used , which checks the property of the set() and returns true if the specified element exists in the set, otherwise it returns false.
                    alert("You have already used this coupon!");
                    return;
                }
            
            // Check if the entered coupon code matches with the availableCoupons object property, if it exists, apply the corresponding bonus to the user's balance    
            if (availableCoupons.hasOwnProperty(enteredCode)) {     // here, hasOwnProperty() method is only used for plain objects not for Set() data structure, because Set() does not have properties like an object, it only has values, so we cannot use hasOwnProperty() method to check if a value exists in the set, instead we use has() method of Set() to check if a coupon code has already been used or not. But for availableCoupons which is a genuine object, we can use hasOwnProperty() method to check if the entered coupon code exists as a property in the availableCoupons object.
                //Get the bonus value from the availableCoupons object according to the entered coupon code
                   const bonusValue = availableCoupons[enteredCode];

                // Update the state
                   userData.balance =  userData.balance + (userData.balance * bonusValue) ; // Update the user's balance by applying bonus percentage according to the entered coupon code
                   usedCoupons.add(enteredCode); // Add the entered coupon code to the usedCoupons object as a property, so that user cannot apply the same coupon code again ... here, .add() method of Set() is used to add a new element to the set, in this case we are adding the entered coupon code to the usedCoupons set, so that we can keep track of which coupons have been used by the user and prevent them from using the same coupon multiple times.
                
                   console.log(usedCoupons); // output : if user applied "MEGA20" coupon code, then it will be added to the usedCoupons set and the output will be Set(1) {"MEGA20"} , if user applied "BONUS50" coupon code, then it will be added to the usedCoupons set and the output will be Set(2) {"MEGA20", "BONUS50"}
                
                   // Update the DOM 
                  document.querySelector('#balance').textContent = userData.balance.toFixed(2); //display updated user balance    
                  alert(`Coupon applied successfully! Your new balance is $${userData.balance.toFixed(2)}`);

                // Clear the input field after successful submission  
                event.target.coupon_code.value = '';

          } 
            else{  // If the entered coupon code does not match with availableCoupons object property, show an alert message to the user
                    alert("Invalid coupon code. Please try again.");
            }
     })

// Display transaction history on the main page
const transactionHistoryContainer = document.querySelector('#transaction-history-container');

    // Get transaction history from local storage
    const transactionHistory =  JSON.parse(localStorage.getItem('transactionHistory')); 

    // If there are transactions in the transaction history, display them on the main page
    if(transactionHistory && transactionHistory.length > 0){
        for(let transaction of transactionHistory){
            const transactionItem = document.createElement('div');
            transactionItem.classList.add('bg-white', 'border-2', 'border-gray-300', 'p-3', 'rounded-lg', 'mb-2');
            const transactionIdElement = document.createElement('p');
            transactionIdElement.classList.add('font-semibold');
            transactionIdElement.textContent = `Transaction ID: ${Math.floor(Math.random() * 1000000)}`;

            const transactionTypeElement = document.createElement('p');
            transactionTypeElement.textContent = `Type: ${transaction.type}`;

            const transactionAmountElement = document.createElement('p');
            transactionAmountElement.textContent = `Amount: $${transaction.amount}`;

            if(transaction.type === "Add Money"){
                 const transactionBankElement = document.createElement('p');
                 transactionBankElement.textContent = `Bank: ${transaction.bank}`;

                 const transactionAccountElement = document.createElement('p');
                 transactionAccountElement.textContent = `Account Number: ${transaction.accountNumber}`;

                 transactionItem.append(transactionBankElement, transactionAccountElement);
            }

            if(transaction.type === "Cash Out"){
              const  agentNumberElement = document.createElement('p');
              agentNumberElement.textContent = `Agent Number: ${transaction.agentNumber}`;

              transactionItem.append(agentNumberElement); 
            }

            if(transaction.type === "Transfer Money"){
                const recipientsAccountNumberElement = document.createElement('p'); 
                recipientsAccountNumberElement.textContent = `Recipients Account Number: ${transaction.recipientsAccountNumber}`
                
                transactionItem.append(recipientsAccountNumberElement); 
            }
           

            const transactionTimeElement = document.createElement('p');
            transactionTimeElement.textContent = `Time: ${transaction.time}`;

            transactionItem.append(transactionIdElement, transactionTypeElement, transactionAmountElement, transactionTimeElement);
            transactionHistoryContainer.appendChild(transactionItem);
        }
    }
    else{
        const noTransactionsMessageElement = document.querySelector('#no-transactions-message');
        noTransactionsMessageElement.textContent = "No transactions yet.";
    }
