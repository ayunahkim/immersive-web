import * as THREE from 'three'

export function addSphereMesh(size,color){
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color});
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}