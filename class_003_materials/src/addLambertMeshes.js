import * as THREE from 'three'

export function addLambertMeshes(){
    const geometry = new THREE.TorusKnotGeometry(0.5,0.1,256,64);
    const material = new THREE.MeshLambertMaterial({
        color:'#27BEF5',
        emissive:'#120321',
        emissiveIntensity:0.3,
        flatShading: true,
    })
    const mesh = new THREE.Mesh(geometry,material)
    return mesh
}