const form = document.forms["contactForm"];

const me = document.getElementById("me");
const realme = document.getElementById("realme");
const metext = document.getElementById("me-text");

// Form Constants for Validation
const hiring = form.elements["about"][2]; 
const hourly = document.getElementById("hourly-rate");
const rate = document.getElementById('rate');
const postal = document.getElementById('postalCode');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const nameInput = document.getElementById('name');
const city = document.getElementById('city');
const email = document.getElementById('email');
const address =  document.getElementById('address');

// global variable for tracking issues in form submission
let problem = false;

// postal code input 
postal.addEventListener('input', function () {
  const postalInput = postal.value.trim(); 
  const postalRegex = /[^0-9DFIOQUWZ][0-9][^DFIOQU] ?[0-9][^0-9DFIOQU][0-9]/; 
  if (!postalRegex.test(postalInput)) {
    problem = true;
    showErrorMessage("Please enter a valid Canadian postal code! e.g. A1A1A1 or A1A 1A1");
  } else {
    hideErrorMessage();
  }
});

address.addEventListener('input', function() {
  const addressInput = address.value.trim(); 
  if (addressInput.length < 5 || isNaN(parseFloat(address.value))) {
    problem = true;
    showErrorMessage("Address is invalid, must be a mix of numbers and letters longer than 5 characters!");
  }
});

email.addEventListener('input', function () {
  const whitespace = /\s/g; 
  emailInput = email.value.trim(); 
  if (whitespace.test(emailInput)) {
    showErrorMessage("Emails cannot contain spaces!"); 
    problem = true;
  } else if (emailInput.length < 5) {
    showErrorMessage("Invalid email length!");
    problem = true;
  } else {
    hideErrorMessage(); 
  }
}); 

city.addEventListener('input', function () {
  const cityInput = city.value.trim();
  if (cityInput.length < 3) {
    showErrorMessage("City name is too short!"); 
  } else if (!isNaN(parseFloat(cityInput))) {
    showErrorMessage("City can't be a number!");
  } else {
    hideErrorMessage();
  }
});

// makes sure that ONLY numbers are entered
phone.addEventListener('input', function() {
  let phonestr = phone.value.trim();
  phonestr = phonestr.replace(/\s+/g, "");
  const phoneRegex = /\D/g; 
  // checks for any non-digits 

  if (phoneRegex.test(phonestr)) {
    showErrorMessage("Please only enter numbers!");
    problem = true;
  } else if (phonestr.length < 10){
    showErrorMessage("Phone number must be at least 10 digits long!");
  } else {
    hideErrorMessage();
  }
  
});

/* Form validation for an hourly rate */
rate.addEventListener('input', function() {
  const amount = parseFloat(rate.value);

  if (isNaN(amount)) {
    showErrorMessage("Hourly rate must be a valid number.");
    problem = true;
  } else if (amount <= 0) {
    showErrorMessage("There's no way you're making me pay to work for you!"); 
    problem = true;
  } else {
    hideErrorMessage();
  }

  if (amount <= 0) {
    showErrorMessage("Hourly rate must be greater than 0!");
    problem = true;
  } else {
    hideErrorMessage();
  }

});

/* For fun function that swaps out my portfolio picture with the extra button */
realme.addEventListener("click", function () {
  if (realme.textContent === "The real me(?)") {
    me.src = "media/therealme.jpg";
    metext.innerHTML =
      "Turns out you can't tell if someone is a cat on the internet.";
    realme.textContent = "Back to the fake me";
    me.id = "realme-image";
  } else {
    me.src = "media/me.jpg";
    realme.textContent = "The real me(?)";
    metext.innerHTML = "A pretty recent photo of me.";
    me.id = "me";
  }
});

/* Hiring Form */ 

// checks every time the form changes for certain conditions

form.addEventListener("change", function() {

  if (hiring.checked) {
    hourly.style.display = "block";
    hourly.querySelector("input").setAttribute("required", true);
  } else {
    hourly.style.display = "none";
    hourly.querySelector("input").removeAttribute("required");
  }
});

const error = document.querySelector('#error');
const errorbox = document.querySelector('#error-box');

function showErrorMessage(msg) {
  // change display type so everything shows
  errorbox.style.display ="block";
  error.style.display ="block";
  // Set the error message text
  error.innerHTML = msg;
} 

function hideErrorMessage() {
  problem = false;
  // remove box and therefore entire message from display
  errorbox.style.display ="none";
  // Clear any previous message
  error.innerHTML = "";
}

/* Form Validation */
/* Each form field checked in order */

form.onsubmit = function() { 

  // validate name input
  // trims whitespace 
  nameInput.value = nameInput.value.trim(); 
  // checks if the name is an actual alphabetic string 
  const nameValue = nameInput.value;
  const nameCheck = /^[a-zA-Z\s]+$/; 

  if (!nameCheck.test(nameValue)) {
    showErrorMessage("Please enter a valid name with only letters and spaces.");
    problem = true;
  }

  if (nameValue.length < 3) {
    showErrorMessage("Name is too short, how will I know who you are!");
    problem = true;
  }

  if (hiring.checked) {
    const rateInput = rate.value.trim(); 
    const pay = parseFloat(rateInput);
    if (isNaN(pay) || pay <= 0 || rateInput.length === 0) {
      showErrorMessage("Invalid hourly rate amount, must be a number greater than 0!");
      problem = true;
    } 
  }
  // validate message length
  // trim value first to only capture important characters

  const messageInput = message.value.trim(); 
  if (messageInput.length < 50) {
    showErrorMessage("Message is too short. Please enter at least 50 characters.");
    problem = true; 
  }

  // Final check to return false to force submission to fail
  // Also forces error box to be scrolled into view for user correction

  if (problem) {
    errorbox.scrollIntoView(); 
    return false;
  } else {
    hideErrorMessage(); 
  }
}

form.onreset = function() {
  hideErrorMessage();
  // clears error message so the user can try again
}
