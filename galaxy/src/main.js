import './style.css'
import * as THREE from 'three'
import { addLight } from './addLight';
import Model from './model'
import { addPlanet } from './addPlanets';

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
const lights = {};
let tick = 0;

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  
  meshes.planet1 = addPlanet('sphere',.8,'sun');
  meshes.planet2 = addPlanet('sphere',.3,'ice');
  meshes.planet3 = addPlanet('torus',.2,'phong');

  scene.add(meshes.planet1);
  scene.add(meshes.planet2);
  scene.add(meshes.planet3);

  lights.default = addLight();
  scene.add(lights.default);

  resize();
  animate();
  instances();
}

function instances(){
  const flower = new Model({
    url:'./assets/bouquet.glb',
    scene: scene,
    meshes: meshes,
    name:'flower',
    scale: new THREE.Vector3(2,2,2),
    position: new THREE.Vector3(0,-0.8,3),
    replace:true,
    replaceURL:'./assets/mat.png',
  })
  flower.init()
}

function resize(){
  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
}

function animate(){
  //loops
  requestAnimationFrame(animate);
  renderer.render(scene,camera);

  tick +=0.01;

  meshes.planet1.rotation.y +=0.01;

  meshes.planet2.position.x = Math.sin(tick*.5)*3;
  meshes.planet2.position.y = Math.cos(tick*.5)*3;
  meshes.planet2.rotation.y += 0.03;

  meshes.planet3.position.x = Math.sin(tick)*2;
  meshes.planet3.position.y = Math.cos(tick)*2;
  meshes.planet3.rotation.y += 0.05;
}