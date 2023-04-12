const me = document.getElementById("me");
const realme = document.getElementById("realme");
const metext = document.getElementById("me-text");

const form = document.forms["contactForm"];
const hiring = form.elements["about"][2]; 
const hourly = document.getElementById("hourly-rate");

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
  errorbox.style.display ="inline-block";
  error.style.display ="block";
  // Clear any previous message
  error.innerHTML = "";
  // Set the error message text
  error.innerHTML = msg;
}

function hideErrorMessage() {
  // remove from display
  errorbox.style.display ="none";
}

/* Form Validation */

form.onsubmit = function() { 

  const name = document.getElementById('name');
  const message = document.getElementById('message');

  // validate name input
  if (name.value.length < 3) {
    showErrorMessage("<b>Name is too short, how will I know who you are!</b>"); 
    return false;
  } else {
    hideErrorMessage();
  }

  // validate message length
  message.value = message.value.trim(); 
  if (message.value.length < 50) {
    showErrorMessage("Message is too short. Please enter at least 50 characters.");
    return false;
  } else {
    hideErrorMessage(); 
  }
}

form.onreset = function() {
  hideErrorMessage();
  // clears error message so the user can try again
}
