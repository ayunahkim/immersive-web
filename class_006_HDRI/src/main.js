import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'
import { environment } from './environment';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true;
// controls.dampingFactor = 0.8

const meshes = {};
const lights = {};
const mixers = [];

const clock = new THREE.Clock()

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

  scene.background = environment();
  scene.environment = environment();
  scene.environment.intensity = 3;

  scene.add(meshes.default);
  scene.add(meshes.standard);

  lights.default = addLight();
  scene.add(lights.default);

  resize();
  animate();
  instances();
}

function instances(){
  const flower = new Model({
    url:'/bouquet.glb',
    scene: scene,
    meshes: meshes,
    name:'flower',
    scale: new THREE.Vector3(2,2,2),
    position: new THREE.Vector3(0,-0.8,3),
    animationState:true,
    mixers:mixers,
    // replace:true,
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
  const delta = clock.getDelta()
  for(const mixer of mixers){
    mixer.update(delta)
  }
  controls.update()
  requestAnimationFrame(animate);
  meshes.default.rotation.x += 0.02;
  meshes.standard.rotation.y += 0.02;

  renderer.render(scene,camera);
}