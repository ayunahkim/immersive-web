import * as THREE from 'three'

export function addSphereMesh(){
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,wireframe:true});
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}