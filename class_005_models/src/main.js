import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
const lights = {};

let tick=0;

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
  instances();
}

function instances(){
  // const flower = new Model({
  //   url:'./assets/bouquet.glb',
  //   scene: scene,
  //   meshes: meshes,
  //   name:'flower',
  //   scale: new THREE.Vector3(2,2,2),
  //   position: new THREE.Vector3(0,-0.8,3),
  //   replace:true,
  //   replaceURL:'./assets/mat.png',
  // })
  // flower.init()

  const car1 = new Model({
    url:'./assets/car1.glb',
    scene: scene,
    meshes:meshes,
    name:'car1',
    scale: new THREE.Vector3(50,50,50),
    position: new THREE.Vector3(0,-0.2,0),
  })
  car1.init();

  const car2 = new Model({
    url:'./assets/car2.glb',
    scene: scene,
    meshes: meshes,
    name: 'car2',
    scale: new THREE.Vector3(0.25,0.25,0.25),
    position: new THREE.Vector3(3,0,0)
  })
  car2.init()

  const car3 = new Model({
    url:'./assets/car3.glb',
    scene:scene,
    meshes:meshes,
    name:'car3',
    scale: new THREE.Vector3(0.003,0.003,0.003),
    position: new THREE.Vector3(-3,-.2,0)
  })
  car3.init()
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