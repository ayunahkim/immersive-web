import * as THREE from 'three'

export function addDefaultMeshes(){
    const geometry = new THREE.TorusKnotGeometry(0.5,0.1,256,64);
    const material = new THREE.MeshBasicMaterial({color: '#27BEF5',});
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}