import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
const lights = {};

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  
  //here we populate our meshes container
  meshes.default = addDefaultMeshes();
  meshes.default.position.x = 2;

  meshes.standard = addStandardMeshes();
  meshes.standard.position.x = -2;

  scene.add(meshes.default);
  scene.add(meshes.standard);

  lights.default = addLight();
  scene.add(lights.default);

  resize();
  animate();
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
  meshes.default.rotation.x += 0.02;
  meshes.standard.rotation.y += 0.02;

  renderer.render(scene,camera);
}