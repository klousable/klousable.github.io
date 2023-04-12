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

/* Form Validation */

