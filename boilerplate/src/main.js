import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes} from './addDefaultMeshes'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  
  //here we populate our meshes container
  meshes.default = addDefaultMeshes();
  meshes.default.position.x = 2;

  meshes.default2 = addDefaultMeshes();
  meshes.default2.position.x = -2;

  meshes.default3 = addDefaultMeshes();
  meshes.default3.position.y = 2;

  scene.add(meshes.default);
  scene.add(meshes.default2);
  scene.add(meshes.default3);

  animate();
}

function animate(){
  //loops
  requestAnimationFrame(animate);
  meshes.default.rotation.x += 2;
  meshes.default.rotation.y += 0.1;

  meshes.default2.rotation.x += 2;
  meshes.default2.rotation.y += 0.1;

  meshes.default3.rotation.x += 2;
  meshes.default3.rotation.y += 0.1;
  renderer.render(scene,camera);
}