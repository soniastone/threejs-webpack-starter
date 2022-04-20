import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('div#webgl')


// Scene
const scene = new THREE.Scene()

const loader = new GLTFLoader();
loader.load( 'chair3.gltf', function ( gltf ) {
    console.log(gltf)
    const chair= gltf.scene;
    chair.scale.set(4,4,4)
    chair.position.set(0.9,-4,-0.5)
    chair.rotation.y=(-Math.PI / 2)
    chair.traverse(n => { if ( n.isMesh ) {
        n.castShadow = true; 
        n.receiveShadow = true;
        if(n.material.map) n.material.map.anisotropy = 2; 
      }});
    scene.add(chair);
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( 'lamp2.gltf', function ( gltf ) {
    console.log(gltf)
    const lamp= gltf.scene;
    lamp.scale.set(4,3.5,4)
    lamp.position.set(-2,-4,-1.5)
    lamp.rotation.y=(-Math.PI / 2)
    lamp.traverse(n => { if ( n.isMesh ) {
        n.castShadow = true; 
        n.receiveShadow = true;
        if(n.material.map) n.material.map.anisotropy = 2; 
      }});
    scene.add(lamp);
})

loader.load( 'pic.gltf', function ( glb ) {
    console.log(glb)
    const pic= glb.scene;
    pic.scale.set(2.9,3.2,2.9)
    pic.position.set(3,0.2,0)
    pic.rotation.y=(-Math.PI / 2)
    
    scene.add(pic);
})



// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const wall = new THREE.BoxBufferGeometry(.1,8,6);
const wall2 = new THREE.BoxBufferGeometry(.1,8,5);
const floor = new THREE.BoxBufferGeometry(6,0.1,5);

// Materials
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('WOOD.png')
const normalTexture2 = textureLoader.load('WALL2 (1).png')

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.01
material.roughness = 0.4
material.color = new THREE.Color(0xFFF8DF)
material.normalMap = normalTexture2
//d9c889

const material2 = new THREE.MeshStandardMaterial()
material2.metalness = 0.5
material2.roughness = 0.5
material2.color = new THREE.Color(0x6b4220)
material2.normalMap = normalTexture

// Mesh
const cube = new THREE.Mesh(wall,material)
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.z = -2.5
cube.rotation.y = Math.PI / 2;
scene.add(cube)
const cube2 = new THREE.Mesh(wall2,material)
cube2.position.x = 3
cube2.castShadow = true;
cube2.receiveShadow = true;
scene.add(cube2)
const cube3 = new THREE.Mesh(floor,material2)
cube3.castShadow = true;
cube3.receiveShadow = true;
cube3.position.y = -4;
scene.add(cube3)
// Lights

const pointLight = new THREE.PointLight(0xF76131, 0.75)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.castShadow=false
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xFFF1C2, 3)
pointLight2.position.x = (-4)
pointLight2.position.y = 4
pointLight2.position.z = 2
pointLight2.castShadow=true
scene.add(pointLight2)
//FFFAD9


const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 3.8 );
scene.add( light );

/**
 * Sizes
 */
var sizes = {
    width: document.getElementById('webgl').offsetWidth,
    height: document.getElementById('webgl').offsetHeight,
}

//window.addEventListener('resize', () =>
//window.addEventListener('resize', () =>
//{
    // Update sizes
    //sizes.width = window.innerWidth
    //sizes.height = window.innerHeight

    // Update camera
    //camera.aspect = sizes.width / sizes.height
    //camera.updateProjectionMatrix()
    //camera.aspect = sizes.width / sizes.height
    //camera.updateProjectionMatrix()

    // Update renderer
    //renderer.setSize(sizes.width, sizes.height)
    //renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//})

function resizeCanvasToDisplaySize() {
    
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
}


const renderer = new THREE.WebGLRenderer({
    //canvas: canvas,
    alpha:true,
    precision:"highp",
    antialias:true
})
//renderer.setSize(sizes.width, sizes.height)
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled=true
renderer.toneMapping= THREE.ReinhardToneMapping
const container = document.getElementById('webgl');
const w22 = container.offsetWidth;
const h22 = container.offsetHeight;
renderer.setSize(w22,500);
container.appendChild(renderer.domElement);
console.log(w22);
console.log(h22);



const camera = new THREE.PerspectiveCamera(60, w22 / 500, 0.1, 100)
camera.position.x = -2
camera.position.y = 1.5
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/**
 * Renderer
 */






/*const renderer = new THREE.WebGLRenderer();
         var container = document.getElementById('webgl');
         var w = container.offsetWidth;
         var h = container.offsetHeight;
         renderer.setSize(w, h);
         container.appendChild(renderer.domElement);
         renderer.shadowMap.enabled=true
         renderer.toneMapping= THREE.ReinhardToneMapping
*/

/**
 * Animate
 */

//document.addEventListener('mousemove', onDocumentMouseMove)
//let mouseX= 0;
//let mouseY= 0;

//let targetX= 0;
//let targetY= 0;

//const windowX= window.innerWidth /2;
//const windowY= window.innerHeight /2;

//function onDocumentMouseMove (event){
    //mouseX = (event.clientX = windowX)
    //mouseY = (event.clientY = windowY)
//}


//const clock = new THREE.Clock()


const tick = () =>
{
    //targetX = mouseX * .001
    //targetY = mouseY * .001

    //camera.rotation.y = Math.PI/2 * targetX

    //const elapsedTime = clock.getElapsedTime()

    // Update objects
    //cube.rotation.y = .5 * elapsedTime
    
    //Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    
    resizeCanvasToDisplaySize()
    
}

tick()