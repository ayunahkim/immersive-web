import * as THREE from 'three'

let randnum = Math.floor(Math.random()*4)
console.log(randnum);

export function addPlanet(shape,size,type){
    const tLoader = new THREE.TextureLoader()
    let color, normal, displace, ao, material, geometry;

    if(shape=='torus'){
        geometry = new THREE.TorusKnotGeometry(size,0.1,256,64);
        geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(geometry.attributes.uv.array,2),
        )
    } else{
        geometry = new THREE.SphereGeometry(size,32,32);
    }
    

    if(type=='ice'||type=='sun'){
        if(type=='sun'){
            color = tLoader.load('/planets/alien/color.jpg')
            normal = tLoader.load('/planets/alien/normal.jpg')
            displace = tLoader.load('/planets/alien/displace.png')
            ao = tLoader.load('/planets/alien/occ.jpg')
        }
        else if(type=='ice'){
            color = tLoader.load('/planets/blue_ice/color.jpg')
            normal = tLoader.load('/planets/blue_ice/normal.jpg')
            displace = tLoader.load('/planets/blue_ice/displace.png')
            ao = tLoader.load('/planets/blue_ice/occlusion.jpg')
        }
    
        material = new THREE.MeshPhysicalMaterial({
        map:color,
        aoMap:ao,
        aoMapIntensity:2,
        normalMap:normal,
        displacementMap:displace,
        displacementScale:0.1,
        metalness:0.5,
        roughness:0.1,
        transmission:0.1,
        ior:2.33,
    })
    } else{
        material = new THREE.MeshPhongMaterial({
        color:'#27BEF5',
        emissive: 0x050816,
        emissiveIntensity:.3,
        specular: 0xffffff,
        shininess: 120,
        reflectivity: 1,
        flatShading: false,
        })
    }
    const mesh = new THREE.Mesh(geometry,material)
    return mesh
}