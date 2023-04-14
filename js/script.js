const me = document.getElementById("me");
const realme = document.getElementById("realme");
const metext = document.getElementById("me-text");
const phone = document.getElementById("phone");
// Form Constants for Validation

const form = document.forms["contactForm"];
const hiring = form.elements["about"][2]; 
const hourly = document.getElementById("hourly-rate");
const rate = document.getElementById('rate');
const name = document.getElementById('name');

// variable for tracking issues in form submission
let problem = false;

// makes sure that ONLY numbers are entered
phone.addEventListener('input', function() {
  let phonestr = phone.value;
  const phoneRegex = /\D/g; 
  if (phoneRegex.test(phonestr)) {
    showErrorMessage("Please only enter numbers!");
  } else {
    hideErrorMessage();
  }
});

/* Form validation for an hourly rate */
rate.addEventListener('input', function() {
  const amount = parseFloat(rate.value);

  if (isNaN(amount)) {
    showErrorMessage("Hourly rate must be a valid number.");
  } else if (amount <= 0) {
    showErrorMessage("There's no way you're making me pay to work for you!"); 
  } else {
    hideErrorMessage();
  }

  if (amount <= 0) {
    showErrorMessage("Hourly rate must be greater than 0!");
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
  // remove box and therefore entire message from display
  errorbox.style.display ="none";
  // Clear any previous message
  error.innerHTML = "";
}

/* Form Validation */

form.onsubmit = function() { 

  const nameInput = document.getElementById('name');
  const message = document.getElementById('message');
  
  // validate name input
  
  // trims whitespace 
  nameInput.value = nameInput.value.trim(); 
  // checks if the name is an actual alphabetic string 
  const nameValue = nameInput.value;
  const nameCheck = /^[a-zA-Z\s]+$/; 

  if (!nameCheck.test(nameValue)) {
    showErrorMessage("Please enter a valid name with only letters and spaces.");
    problem = true;
  } else {
    hideErrorMessage();
  }

  if (nameValue.length < 3) {
    showErrorMessage("Name is too short, how will I know who you are!");
    problem = true;
  } else {
    hideErrorMessage(); 
  }
  
  // validate message length
  // trim value first to only capture important characters
  message.value = message.value.trim(); 
  if (message.value.length < 50) {
    problem = true;
    showErrorMessage("Message is too short. Please enter at least 50 characters.");
  } else if (!problem) {
    hideErrorMessage(); 
  }

  // Final check to return false to force submission to fail
  // Also forces error box to be scrolled into view for user correction

  if (problem) {
    errorbox.scrollIntoView(); 
    problem = false;
    return false;
  }
}

form.onreset = function() {
  hideErrorMessage();
  // clears error message so the user can try again
}
