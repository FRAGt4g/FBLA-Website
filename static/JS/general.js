const mouse_glow = document.getElementById("mouse_glow")

document.addEventListener('mousemove', function (mouse) {
  moveMouseBlob(mouse)
  //strectchAndRotateMouseBlob(mouse)
});

function moveMouseBlob(mouse) {
  mouse_glow.animate({
    left: `${mouse.clientX - mouse_glow.offsetWidth / 2}px`,
    top: `${mouse.clientY - mouse_glow.offsetHeight / 2}px`
  }, {
    duration: 3000,
    fill: 'forwards'
  })
}
function strectchAndRotateMouseBlob(mouse) {
  /* 
   * Commented out code stretches and rotates glow orb. Is not really nessecary from personal experience and can bug out 
   * Removed variable mouse_glow_radius which is nessecary for this to work. It is a number in terms of vmin
   */
  mouse_glow_rect = mouse_glow.getBoundingClientRect();
  x = mouse_glow_rect.left + mouse_glow_rect.width / 2;
  y = mouse_glow_rect.top + mouse_glow_rect.height / 2;
  horizontal_distance = x - mouseX;
  vertical_distance = y - mouseY;
  distance = pixelsToVmin(Math.sqrt(
  horizontal_distance * horizontal_distance +
  vertical_distance * vertical_distance
  ))
  distance_scaler = Math.min(distance + mouse_glow_radius, mouse_glow_radius + 10)
  let angle = calculateAngle({ x: x, y: y }, { x: mouseX, y: mouseY })
  mouse_glow.style.transform = `rotate(${angle}deg)`;
  mouse_glow.style.width = `${distance_scaler}vmin`;
}

function scramble(e=this, tick_rate=10, total_time=1000) {
  if (!e.start_text) e.start_text = e.innerText //For first time scramble, get the inital text
  if (e.scrambling) return //If scrambling is already in progress, don't do anything

  e.scrambling = true
  e.ticks = 0
  e.length = e.innerText.length
  e.intervalID = setInterval(function() {
    e.ticks++
    e.start_index = Math.round(e.ticks * tick_rate/total_time * e.length)

    e.innerText = e.start_text.substring(0, e.start_index)

    for (i = e.start_index; i < e.length; i++) {
      toAdd = ""
      if (e.start_text.charAt(i) == " ") {
        toAdd += " "
        i++
      }
      toAdd += String.fromCharCode(65 + Math.floor(Math.random() * 52))
      e.innerText += toAdd
    }

    //End condition
    if (e.ticks * tick_rate >= total_time) {
      clearInterval(e.intervalID)
      e.scrambling = false
    }
  }, tick_rate)
}

//Helpers
function calculateAngle(p1, p2) {
  // Calculate the angle in radians
  var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

  // Convert radians to degrees
  var angleDegrees = angleRadians * (180 / Math.PI);

  // Ensure the angle is positive (between 0 and 360 degrees)
  currentAngle = (angleDegrees + 360) % 360;

  targetAngle = Math.floor(currentAngle);
  clockwiseRotation = targetAngle - currentAngle < 0 ? targetAngle - currentAngle + 360 : targetAngle - currentAngle;
  counterclockwiseRotation = currentAngle - targetAngle < 0 ? currentAngle - targetAngle + 360 : currentAngle - targetAngle;
  rotationDirection = clockwiseRotation < counterclockwiseRotation ? 1 : -1;
  angle = currentAngle + rotationDirection * Math.min(clockwiseRotation, counterclockwiseRotation);
  return angle
}
function pixelsToVmin(pixels) {
  // Get the viewport dimensions
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Calculate the smaller dimension
  var smallerDimension = Math.min(viewportWidth, viewportHeight);

  // Convert pixels to vmin
  var vminValue = (pixels / smallerDimension) * 100;

  return vminValue;
}