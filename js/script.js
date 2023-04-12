console.log("SCRIPT LINKED");

const me = document.getElementById('me');
const realme = document.getElementById('realme'); 
const metext = document.getElementById('me-text');
realme.addEventListener('click', function() {
    if (realme.textContent === "The real me(?)") {
        me.src = "media/therealme.jpg";
        metext.innerHTML = "Turns out you can't tell if someone is a cat on the internet.";
        realme.textContent = "Back to the fake me";
        me.id = "realme-image";
      } else {
        me.src = "media/me.jpg";
        realme.textContent = "The real me(?)";
        metext.innerHTML = "A pretty recent photo of me.";
        me.id = "me";
      }
});

