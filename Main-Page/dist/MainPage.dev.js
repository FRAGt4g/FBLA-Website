"use strict";

var realityText = document.getElementById("reality");
realityText.addEventListener("mouseover", function () {
  realityText.animate([{
    color: 'red'
  }], {
    duration: 2000,
    easing: 'ease-in',
    delay: 0,
    iterations: 1,
    direction: 'alternate',
    fill: 'both'
  });
});
realityText.addEventListener("mouseout", function () {
  console.log("test");
});

function zoomin(e) {
  e.style.zIndex = "1000";
  console.log(e.style.zIndex);

  e.parentNode.animate([{
    transform: 'scale(20)',
    color: 'red'
  }], {
    duration: 500,
    easing: 'ease-in',
    delay: 0,
    iterations: 1,
    direction: 'alternate',
    fill: 'both'
  }).onfinish = function () {
    window.location.href = "../Application-Page/ApplicationMain.html";
  };
}