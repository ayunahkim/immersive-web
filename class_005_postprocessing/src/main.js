import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'
import { postprocessing } from './postprocessing'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
const lights = {};

let composer;

let tick=0;

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  composer = postprocessing(scene,camera,renderer);
  
  //here we populate our meshes container
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
  if(meshes.flower){
    meshes.flower.rotation.y += 0.01
  }

  // renderer.render(scene,camera);
  composer.render();
}