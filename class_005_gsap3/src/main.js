import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes, addStandardMeshes} from './addDefaultMeshes'
import { addLight } from './addLight';
import Model from './model'
import gsap from 'gsap'
import { InteractionManager } from 'three.interactive'

const scene = new THREE.Scene();
// (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// make sure interaction manager is AFTER camera and renderer
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
)

let modelFlag = false;

const meshes = {};
const lights = {};

let tick=0;
let counter = 0;

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
  interactions();
}

function interactions(){
  meshes.default.addEventListener('click',(event)=>{
    gsap.to(meshes.default.scale,{
      x:meshes.default.scale.x+1,
      y:meshes.default.scale.y+1,
      z:meshes.default.scale.z+1,
      duration:1,
      ease:'power1'
    })
    gsap.to(meshes.default.position,{
      y:meshes.default.position.y+1,
      duration:1,
      delay:1,
      ease:'power1'
    })
  })

  meshes.standard.addEventListener('click',(event)=>{
    gsap.to(meshes.standard.scale,{
      x:meshes.standard.scale.x+1,
      y:meshes.standard.scale.y+1,
      z:meshes.standard.scale.z+1,
      duration:1,
      ease:'power1'
    })
    gsap.to(meshes.standard.position,{
      y:meshes.standard.position.y+1,
      duration:1,
      ease:'power1'
    })
  })

  interactionManager.add(meshes.default);
  interactionManager.add(meshes.standard);
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
  interactionManager.update();

  if(meshes.flower && modelFlag==false){
    modelFlag = true;
    meshes.flower.addEventListener('click',(event)=>{
        gsap.to(meshes.flower.rotation,{
        x:meshes.flower.rotation.x + Math.PI * 2,
        y:meshes.flower.rotation.y + Math.PI * 2,
        z:meshes.flower.rotation.z + Math.PI * 2,
        duration:2,
        ease:'power2'
      })
    })
    interactionManager.add(meshes.flower);
  }

  requestAnimationFrame(animate);
  meshes.default.rotation.x += 0.02;
  meshes.standard.rotation.y += 0.02;

  renderer.render(scene,camera);
}