const me = document.getElementById("me");
const realme = document.getElementById("realme");
const metext = document.getElementById("me-text");
const phone = document.getElementById("phone");
// Form Constants for Validation

const form = document.forms["contactForm"];
const hiring = form.elements["about"][2]; 
const hourly = document.getElementById("hourly-rate");
const rate = document.getElementById('rate');

// variable for tracking issues in form submission
var problem = false;

// makes sure that ONLY numbers are entered
phone.addEventListener('input', function() {
  let input = phone.value;
  const phoneRegex = /\D/g; 
  if (regex.test(phoneRegex)) {
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

  hideErrorMessage();

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
  // Clear any previous message
  error.innerHTML = "";
  // Set the error message text
  error.innerHTML = msg;
} 

function hideErrorMessage() {
  // remove box and therefore entire message from display
  errorbox.style.display ="none";
  // changes problem to false so form can submit
  problem = false; 
}

/* Form Validation */

form.onsubmit = function() { 
  const name = document.getElementById('name');
  const message = document.getElementById('message');

  // validate name input
  if (name.value.length < 3) {
    showErrorMessage("<b>Name is too short, how will I know who you are!</b>"); 
   problem = true;
  } else {
    hideErrorMessage();
  }

  // checks if the name is an actual alphabetic string 
  if (!isNaN(name.value)) {
    showErrorMessage("<b>Name can't be a number! Please include a valid name.</b>")
  } else {
    hideErrorMessage(); 
  }

  // validate message length
  // trim value first to only capture important characters
  message.value = message.value.trim(); 
  if (message.value.length < 50) {
    showErrorMessage("Message is too short. Please enter at least 50 characters.");
    problem = true;
  } else {
    hideErrorMessage(); 
  }

  // Grabs hourly rate input and checks if it is greater than 0 
  // Load message in the case it is not 
  
  const pay = parseFloat(rate.value);
  if (pay <= 0) {
    showErrorMessage("Hourly rate must be greater than 0!");
    problem = true;
  } else {
    hideErrorMessage();
  }

  // Final check to return false to force submission to fail
  // Also forces error box to be scrolled into view for user correction

  if (problem) {
    errorbox.scrollIntoView(); 
    return false;
  }
}

form.onreset = function() {
  hideErrorMessage();
  // clears error message so the user can try again
}
