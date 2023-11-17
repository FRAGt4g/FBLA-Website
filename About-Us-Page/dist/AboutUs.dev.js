"use strict";

var accordion = document.getElementsByClassName("accordionElement");

for (i = 0; i < accordion.length; i++) {
  console.log(accordion[i].innerHTML);
  console.log("child: " + accordion[i].children[0].innerHTML);
  accordion[i].children[0].addEventListener('click', function () {
    this.parentNode.classList.toggle('active');
    this.children[1].animate([{
      transform: 'rotate(0deg)'
    }, {
      innerHTML: '-'
    }, {
      transform: 'rotate(180deg)'
    }], {
      duration: 500,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'normal',
      fill: 'forwards'
    });
    this.children[1].innerHTML = this.children[1].innerHTML === '+' ? '-' : '+';
  });
}