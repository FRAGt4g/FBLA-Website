var test = document.getElementById("NIHAO");
var form = document.getElementById("myForm");
var submitButton = document.getElementById("submitButton");
var dropdownButton = document.getElementById("dropdownMenuButton");
var dropdownItems = document.querySelectorAll(".dropdown-item");
var position = document.getElementById("position");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjIXnkiQHjUh1h5x9cAy3kSQmFrQ1ecl15fJvk35MpUcZiVhX2aESZdAVg8P5Hi-WGOQ/exec";

const accordion = document.getElementsByClassName("accordionElement");

for (i = 0; i < accordion.length; i++) {
    console.log(accordion[i].innerHTML);
    console.log("child: " + accordion[i].children[0].innerHTML);
    accordion[i].children[0].addEventListener('click', function() {
        this.parentNode.classList.toggle('active');
    })
}

function zoomin(e) {
    e.style.zIndex = "1000";
    console.log(e.style.zIndex);
    e.parentNode.animate(
        [
            { 
                transform: 'scale(20)',
                color: 'red',
            }
        ], {
            duration: 500,
            easing: 'ease-in',
            delay: 0,
            iterations: 1,
            direction: 'alternate',
            fill: 'both'
        },
    ).onfinish = function () {
        window.location.href = "../Application-Page/ApplicationMain.html"
    };
}

dropdownItems.forEach(function (item) {
    item.addEventListener("click", function() {
        var selectedValue = item.getAttribute("data-position");
        dropdownButton.innerHTML = selectedValue;
        position.value = selectedValue;
    })
})

//testing ok leave me alone
/*test.addEventListener("click", function() {
    if (test.innerHTML == "NI HAO") {
        test.innerHTML = "IM SPECIAL";
    } else {
        test.innerHTML = "NI HAO";
    }
    
});*/

submitButton.addEventListener("click", function() {
    test.innerHTML = "NOOOOOOOOO";
    document.getElementById("loadingIcon").classList.remove("d-none");
})

/*form.addEventListener("submit", e => {
    e.preventDefault()
    console.log('SCRIPT_URL:', SCRIPT_URL);

    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
          position.textContent = "Form Has Been Updated!";
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
        
})*/

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var selectedPosition = dropdownButton.getAttribute("data-position");
    var formData = new FormData(this);
    formData.set("position", selectedPosition);

    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(this) })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        position.textContent = "Form Has Been Updated!";

        // Handle success
        if (data.result === 'success') {
          alert('Form has been submitted successfully. Updated row: ' + data.row);
        } else {
          alert('Form submission failed.');
        }
        document.getElementById("loadingIcon").classList.add("d-none");
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        document.getElementById("loadingIcon").classList.add("d-none");
      });
  });