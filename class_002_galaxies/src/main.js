import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes} from './addDefaultMeshes'
import { addSphereMesh } from './addSphereMesh';

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
let tick =0;

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;

  meshes.sphere = addSphereMesh(.4,'skyblue');
  meshes.sphere.position.x = -2;
  meshes.sphere2 = addSphereMesh(1,'yellow');
  meshes.sphere3 = addSphereMesh(.5,'salmon');
  meshes.sphere3.position.x = 1;

  scene.add(meshes.default);
  scene.add(meshes.sphere);
  scene.add(meshes.sphere2);
  scene.add(meshes.sphere3);
  animate();
}

function animate(){
  //loops
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  tick+=0.01;

  meshes.sphere.position.x = Math.sin(tick*2)*3;
  meshes.sphere.position.y = Math.cos(tick*2)*3;
  meshes.sphere3.position.x = Math.sin(tick*3)*-2;
  meshes.sphere3.position.y = Math.cos(tick*3)*-2;
}