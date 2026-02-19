import * as THREE from 'three'

export function addLight(){
   const keyLight = new THREE.DirectionalLight(0xffffff, 1);
   keyLight.position.set(0,0,2);
   const rimLight = new THREE.PointLight(0xff77ff,5,20);
   rimLight.position.set(-3,-2,1);
   const fillLight = new THREE.PointLight(0xffffff,6);
   fillLight.position.set(0,0,2);

   return keyLight,rimLight,fillLight
}