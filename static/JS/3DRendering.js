import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import * as Orbit from '../THREE Imports/Orbit.js';
const css = getComputedStyle(document.body)

const scene = new THREE.Scene();
const mouseLight = new THREE.PointLight(new THREE.Color(css.getPropertyValue('--accent-jacob')), 1.5)
const world_light = new THREE.AmbientLight(0xFFFFFF, 1.75)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector("#bg"),
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new Orbit.OrbitControls(camera, renderer.domElement);

//Camera Scroll handler
window.addEventListener('scroll', () => {
  tourus.rotation.x += 0.01
  tourus.rotation.y += 0.01
  tourus.rotation.z -= 0.05
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Start Rendering loop
window.onload = (() => { 
  const AnimationTick = () => { 
    requestAnimationFrame(AnimationTick)

    Update_Backlighting()
    tourus.rotation.y += 0.01

    // controls.update()
    // cssRenderer.render(scene, camera);
    renderer.render(scene, camera) 
  }
  AnimationTick(); 
})

function Update_Backlighting() {
  let mouseGlowRect = mouse_glow.getBoundingClientRect();
  let mouseX = mouseGlowRect.left + mouseGlowRect.width / 2;
  let mouseY = mouseGlowRect.top + mouseGlowRect.height / 2;
  mouseX = (mouseX / window.innerWidth) * 2 - 1;
  mouseY = - (mouseY / window.innerHeight) * 2 + 1;

  // Update light position based on mouse coordinates
  var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  vector.unproject(camera);

  var dir = vector.sub(camera.position).normalize();
  var distance = - camera.position.z / dir.z;

  mouseLight.position.copy(camera.position.clone().add(dir.multiplyScalar(distance)));
}

/*---------------------------------------------Above is setting up 3d enviroment---------------------------------------------*/
const tourus = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 16, 100), 
  new THREE.MeshStandardMaterial({
    metalness: 0.9,
    roughness: 0.1,
    envMap: new THREE.CubeTextureLoader().load([
      '../HDRI.jfif', '../HDRI.jfif',
      '../HDRI.jfif', '../HDRI.jfif',
      '../HDRI.jfif', '../HDRI.jfif',
    ]),
    color: new THREE.Color(css.getPropertyValue('--accent-jacob')),
  })
)

const loader = new THREE.FontLoader();


loader.load('static/Madimi One_Regular.json', function ( font ) {
  const TextShape = new THREE.Mesh(
    new THREE.TextGeometry('MYTHOS', {
      font: font,
      color: 0xff0000,
      height: 5,
      size: 10,
      curveSegments: 25,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelSegments: 9
    }),
    new THREE.MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.01,
      color: new THREE.Color(css.getPropertyValue('--accent-jacob')),
    })
  )
  scene.add(TextShape)
})


scene.add(
  tourus,
  world_light,
  mouseLight
)