import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes} from './addDefaultMeshes'
import {addStandardMeshes} from './addStandardMeshes'
import {addPhongMeshes} from './addPhongMeshes'
import { addLambertMeshes } from './addLambertMeshes'
import { addPhysicalMeshes } from './addPhysicalMeshes'

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

  //lights
  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
	keyLight.position.set(5, 5, 5);
	scene.add(keyLight);
  const keyHelper = new THREE.DirectionalLightHelper(keyLight, 5);
  scene.add(keyHelper);
  const rimLight = new THREE.PointLight(0xff77ff,5,20);
  rimLight.position.set(-3,-2,1);
  scene.add(rimLight);
  const rimHelper = new THREE.PointLightHelper(rimLight,2);
  scene.add(rimHelper);
  const fillLight = new THREE.PointLight(0xffffff,1);
  fillLight.position.set(2,2,2);
  scene.add(fillLight);
  const fillHelper = new THREE.PointLightHelper(fillLight,2);
  scene.add(fillHelper);

  
  //here we populate our meshes container
  //materials test
  meshes.default = addDefaultMeshes();
  meshes.standard = addStandardMeshes();
  meshes.phong = addPhongMeshes();
  meshes.lambert = addLambertMeshes();
  meshes.physical = addPhysicalMeshes();

  meshes.default.position.y = -2;
  scene.add(meshes.default);

  scene.add(meshes.standard);

  meshes.phong.position.x = -2;
  scene.add(meshes.phong);

  meshes.lambert.position.x = 2;
  scene.add(meshes.lambert);

  meshes.physical.position.y = 2;
  scene.add(meshes.physical);


  animate();
}

function animate(){
  //loops
  requestAnimationFrame(animate);
  meshes.default.rotation.y += 0.01;
  meshes.standard.rotation.y += 0.01;
  meshes.phong.rotation.y += 0.01;
  meshes.lambert.rotation.y += 0.01;
  meshes.physical.rotation.y += 0.01;

  renderer.render(scene,camera);
}