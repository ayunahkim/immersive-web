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

  meshes.sphere = addSphereMesh(.3,'skyblue');
  meshes.sphere2 = addSphereMesh(1,'yellow');
  meshes.sphere3 = addSphereMesh(.2,'salmon');
  meshes.sphere4 = addSphereMesh(.3,'aliceblue');
  meshes.sphere5 = addSphereMesh(.2,'aquamarine');
  meshes.sphere6 = addSphereMesh(.2,'mediumpurple');

  scene.add(meshes.sphere);
  scene.add(meshes.sphere2);
  scene.add(meshes.sphere3);
  scene.add(meshes.sphere4);
  scene.add(meshes.sphere5);
  scene.add(meshes.sphere6);
  animate();
}

function animate(){
  //loops
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  tick+=0.01;

  meshes.sphere.position.x = Math.sin(tick*.5)*3;
  meshes.sphere.position.y = Math.cos(tick*.5)*3;

  meshes.sphere3.position.x = Math.sin(tick)*2;
  meshes.sphere3.position.y = Math.cos(tick)*2;

  meshes.sphere4.position.x = Math.sin(tick*3)*1.5;
  meshes.sphere4.position.y = Math.cos(tick*3)*1.5;

  meshes.sphere5.position.x = Math.sin(tick*2)*3;
  meshes.sphere5.position.y = Math.cos(tick*2)*3;

  meshes.sphere6.position.x = Math.sin(tick)*4;
  meshes.sphere6.position.y = Math.cos(tick)*4;
}