const mouse_glow_radius = 20
const mouse_glow = document.getElementById("mouse_glow")

function getUntrimmedInnerHTML(element) {
  let untrimmedHTML = '';

  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];

    if (node.nodeType === 3) {
      // Node.TEXT_NODE represents a text node
      untrimmedHTML += node.nodeValue;
    } else if (node.nodeType === 1) {
      // Node.ELEMENT_NODE represents an element node (HTML child found)
      break;
    }
    // Other node types (e.g., comments) are ignored
  }

  return untrimmedHTML;
}

document.addEventListener('mousemove', function (mouse) {
  moveMouseBlob(mouse)
  //strectchAndRotateMouseBlob(mouse)
});

function moveMouseBlob(mouse) {
  mouse_glow.animate({
    left: `${mouse.clientX - mouse_glow.offsetWidth / 2}px`,
    top: `${mouse.clientY - mouse_glow.offsetHeight / 2}px`
  }, {
    duration: 1500,
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
  horizontal_distance = x - mouse.clientX;
  vertical_distance = y - mouse.clientY;
  distance = pixelsToVmin(Math.sqrt(
  horizontal_distance * horizontal_distance +
  vertical_distance * vertical_distance
  ))
  distance_scaler = Math.min(distance + mouse_glow_radius, mouse_glow_radius + 10)
  let angle = calculateAngle({ x: x, y: y }, { x: mouse.clientX, y: mouse.clientY })
  mouse_glow.style.transform = `rotate(${angle}deg)`;
  mouse_glow.style.width = `${distance_scaler}vmin`;
}

function scramble(element, tick_rate = 10, total_time = 1000) {
  if (!element.start_text) element.start_text = element.innerText;
  if (element.scrambling) return;

  element.scrambling = true;
  element.ticks = 0;
  element.length = element.innerText.length;
  element.startTime = performance.now();
  element.html = element.innerHTML.substring(getUntrimmedInnerHTML(element).length)
  
  function scramble_tick() {
    currentTime = performance.now();
    element.start_index = Math.floor(
      (currentTime - element.startTime) / total_time * element.length
    );

    element.innerText = element.start_text.substring(0, element.start_index);

    for (let i = element.start_index; i < element.length; i++) {
      let toAdd = "";
      if (element.start_text.charAt(i) == " ") {
        toAdd += " ";
        i++;
      }
      toAdd += String.fromCharCode(65 + Math.floor(Math.random() * 52));
      element.innerText += toAdd;
    }

    element.innerHTML = element.innerText + element.html;

    // End condition
    if (currentTime - element.startTime < total_time) {
      requestAnimationFrame(scramble_tick);
    } else {
      element.scrambling = false;
    }
  }

  requestAnimationFrame(scramble_tick);
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