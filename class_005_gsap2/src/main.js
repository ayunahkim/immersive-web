import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'
import gsap from 'gsap'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const meshes = {};
const lights = {};

let tick = 0;
let counter = 0;
const defaultScale = {x:0,y:0,z:0}

init();
function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  
  //here we populate our meshes container
  meshes.default = addDefaultMeshes();

  meshes.standard = addStandardMeshes();
  meshes.standard.position.x = 10;
  meshes.standard.scale.set(defaultScale.x,defaultScale.y,defaultScale.z)

  meshes.third = addStandardMeshes()
  meshes.third.position.x = 20
  meshes.third.scale.set(defaultScale.x,defaultScale.y,defaultScale.z)

  scene.add(meshes.default);
  scene.add(meshes.standard);
  scene.add(meshes.third);

  lights.default = addLight();
  scene.add(lights.default);


  resize();
  animate();
  interactions();
  // instances();
}

function interactions(){
  window.addEventListener('click',()=>{
    counter++;
    if(counter==1){
      gsap.to(camera.position,{
        x:10,
        duration:1.5,
        ease:'power1.inOut'
      })
      gsap.to(meshes.standard.scale,{
        x:1,
        y:1,
        z:1,
        duration:1,
        delay:0.5,
        ease:'power1.inOut'
      })
    }
    else if(counter==2){
      gsap.to(camera.position,{
        x:20,
        duration:1.5,
        ease:'power1.inOut'
      })
      gsap.to(meshes.third.scale,{
        x:1,
        y:1,
        z:1,
        duration:1,
        delay:0.5,
        ease:'power1.inOut'
      })
    }
    else if(counter==3){
      gsap.to(camera.position,{
        x:0,
        duration:1,
        ease:'power1.inOut'
      })
      counter = 0;
    }
  })
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
  meshes.default.rotation.x += 0.02;
  meshes.standard.rotation.y += 0.02;

  renderer.render(scene,camera);
}