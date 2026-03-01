import * as THREE from 'three'

export function addLight(){
    const light = new THREE.DirectionalLight(0xffffff,1)
    light.position.set(0,1,1)
    return light
}