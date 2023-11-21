const realityText = document.getElementById("reality");
const accordion = document.getElementsByClassName("accordionElement");

for (i = 0; i < accordion.length; i++) {
    console.log(accordion[i].innerHTML);
    console.log("child: " + accordion[i].children[0].innerHTML);
    accordion[i].children[0].addEventListener('click', function() {
        this.parentNode.classList.toggle('active');

        this.children[1].animate([
            { transform: 'rotate(0deg)' },
            { innerHTML: '-' },
            { transform: 'rotate(180deg)' },
        ], {
            duration: 500,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        });

        this.children[1].innerHTML = (this.children[1].innerHTML === '+') ? '-' : '+';
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