import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes, sphereMaker} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'
import gsap from 'gsap'
import { InteractionManager } from 'three.interactive'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
)

const meshes = {};
const lights = {};

let tick=0;

let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let button5 = document.getElementById('button5');

let exercisenum = document.getElementById('exercisenum');

init();

function init(){
  //setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  
  //here we populate our meshes container
  meshes.sphere1 = new sphereMaker("powderblue");
  meshes.sphere2 = new sphereMaker("lightpink");
  meshes.sphere3 = new sphereMaker("lightgreen");

  meshes.sphere1.position.set(-3,0,0);
  meshes.sphere2.position.set(0,0,0);
  meshes.sphere3.position.set(3,0,0);

  scene.add(meshes.sphere1);
  scene.add(meshes.sphere2);
  scene.add(meshes.sphere3);

  lights.default = addLight();
  scene.add(lights.default);
  
  interactions();
  resize();
  animate();
  // instances();
}

function interactions(){
  button1.addEventListener('click',()=>{
    console.log(1)
    resetSpheres(1);
    exercisenum.innerHTML = "Exercise 1";

    gsap.to(meshes.sphere1.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      ease:'power1.in'
    })
    gsap.to(meshes.sphere2.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      ease:'power1.in'
    })
    gsap.to(meshes.sphere3.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      ease:'power1.in'
    })
  })

  button2.addEventListener('click',()=>{
    console.log(2)
    resetSpheres(2);
    exercisenum.innerHTML = "Exercise 2";

    gsap.to(meshes.sphere1.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      ease:'power1.in'
    })
    gsap.to(meshes.sphere1.position,{
      y:0,
      duration:1,
      ease:'power1.in'
    })

    gsap.to(meshes.sphere2.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      delay:0.5,
      ease:'power1.in'
    })
    gsap.to(meshes.sphere2.position,{
      y:0,
      duration:1,
      delay:0.5,
      ease:'power1.in'
    })

    gsap.to(meshes.sphere3.scale, {
      x: 2,
      y:2,
      z:2,
      duration:1,
      delay:1,
      ease:'power1.in'
    })
    gsap.to(meshes.sphere3.position,{
      y:0,
      duration:1,
      delay:1,
      ease:'power1.in'
    })
  })

  button3.addEventListener('click',()=>{
    console.log(3)
    resetSpheres(3)
    exercisenum.innerHTML = "Exercise 3";

    meshes.sphere1.addEventListener('mouseover',()=>{
      gsap.to(meshes.sphere1.position,{
        y: meshes.sphere1.position.y + 0.3,
        duration:0.5,
        ease:'power1.in'
      })
    })
    meshes.sphere1.addEventListener('mouseout',()=>{
      gsap.to(meshes.sphere1.position,{
        y:0,
        duration:0.5,
        ease:'power1.in'
      })
    })

    meshes.sphere2.addEventListener('mouseover',()=>{
      gsap.to(meshes.sphere2.position,{
        y: meshes.sphere2.position.y + 0.3,
        duration:0.5,
        ease:'power1.in'
      })
    })
    meshes.sphere2.addEventListener('mouseout',()=>{
      gsap.to(meshes.sphere2.position,{
        y:0,
        duration:0.5,
        ease:'power1.in'
      })
    })

    meshes.sphere3.addEventListener('mouseover',()=>{
      gsap.to(meshes.sphere3.position,{
        y:meshes.sphere3.position.y + 0.3,
        delay:0.5,
        ease:'power1.in'
      })
    })
    meshes.sphere3.addEventListener('mouseout',()=>{
      gsap.to(meshes.sphere3.position,{
        y:0,
        duration:0.5,
        ease:'power1.in'
      })
    })

    interactionManager.add(meshes.sphere1)
    interactionManager.add(meshes.sphere2)
    interactionManager.add(meshes.sphere3)
    
  })

  button4.addEventListener('click',()=>{
    console.log(4);
    resetSpheres(4);
    exercisenum.innerHTML = "Exercise 4"

    // repeats are set to 3 because otherwise it'll keep going even tho u move to new exercise
    // and i don't know how to stop it lol
    gsap.to(meshes.sphere1.position,{
      y:1,
      duration:1,
      ease:'power1.in',
      repeat:3,
      yoyo:true,
    })
    gsap.to(meshes.sphere2.position,{
      y:1,
      duration:1,
      ease:'power1.in',
      repeat:3,
      yoyo:true,
      delay:0.5
    })
    gsap.to(meshes.sphere3.position,{
      y:1,
      duration:1,
      ease:'power1.in',
      repeat:3,
      yoyo:true,
      delay:1
    })
  })

  button5.addEventListener('click',()=>{
    console.log(5)
    exercisenum.innerHTML = "Exercise 5"
    resetSpheres(5)

    gsap.from(meshes.sphere1.position,{
      y:1,
      duration:1,
      ease:'power1.in'
    })
    gsap.from(meshes.sphere1.material,{
      opacity:0,
      duration:1,
      ease:'power1.in'
    })

    gsap.from(meshes.sphere2.position,{
      y:1,
      duration:1,
      ease:'power1.in',
      delay:0.5
    })
    gsap.from(meshes.sphere2.material,{
      opacity:0,
      duration:1,
      delay:0.5,
      ease:'power1.in'
    })

    gsap.from(meshes.sphere3.position,{
      y:1,
      duration:1,
      ease:'power1.in',
      delay:1,
    })
    gsap.from(meshes.sphere3.material,{
      opacity:0,
      duration:1,
      ease:'power1',
      delay:1,
    })
  })
}

function resetSpheres(num){
  meshes.sphere1.scale.set(1,1,1);
  meshes.sphere2.scale.set(1,1,1);
  meshes.sphere3.scale.set(1,1,1);

  if(num==1||num==3||num==5){
    meshes.sphere1.position.set(-3,0,0);
    meshes.sphere2.position.set(0,0,0);
    meshes.sphere3.position.set(3,0,0);
  } else if(num==2){
      meshes.sphere1.position.set(-3,1,0);
      meshes.sphere2.position.set(0,1,0);
      meshes.sphere3.position.set(3,1,0);
  } else if(num==4){
      meshes.sphere1.position.set(-3,-1,0);
      meshes.sphere2.position.set(0,-1,0);
      meshes.sphere3.position.set(3,-1,0);
  }
}

function resize(){
  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
}

function animate(){
  interactionManager.update();

  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}