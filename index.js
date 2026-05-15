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