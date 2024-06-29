import * as THREE from "three"; 

//using one of the addons to the imput camera that is the "OrbitCamera"
import { OrbitControls } from "jsm/controls/OrbitControls.js";

//there are three things threejs needs --> 1. renderer 2. camera 3. scene

//creating the renderer first
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialis: true});
//setting the size of the renderer
renderer.setSize(w, h);
//appending to the DOM
document.body.appendChild(renderer.domElement);
// another way to do the above statement operation is to create a canvas element in you HTML and then use that when setting up the renderer;

//setting up the camera

//defining the parameters required for the PerspectiveCamera in order to set the camera
const fov = 75; //75 is defined in terms of degree here [5 degreee --> FOV would be narrower]
const aspect = w / h; //aspect ratio of the canvas
const near = 0.1; //near clipping plane
const far = 10; //far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// for setting up the PerspectiveCamera, have to define 4 things for it --> 1. Field of view 2. Aspect 3. Near 4. Far
// scotching back the camera a little bit even though we haven't yet done anything using the camera
camera.position.z = 2; // it's a little bit further so what is at the center can be seen

//setting up the scene
const scene = new THREE.Scene();

//defining the orbit controls
const controls = new OrbitControls(camera, renderer.domElement); //now able the interact with the threeD model directly [move/rotate as you want];
//twick it a little bit
controls.enableDamping = true;
controls.dampingFactor = 0.25;

//adding a cube to the scene
//setting up the geomteric shape
const geo = new THREE.IcosahedronGeometry(1.0, 2); //1.0 = size 2 = detail
//setting up the material
const mat = new THREE.MeshStandardMaterial({ //MeshBasicMaterial doesnt interact wiht the light therefore now using the MeshStandardMaterial
    color: 0xffffff, //defined color
    flatShading: true //allows to see the fascate
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh); //scene.add(parameter) --> adds to the scene and further with the help of renderer we can display[render] that on site

//to highlight the fascates, adding another geometry [wireframe geometry]
//defining the material for the wireframe geometry
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001); //little less flikery now. the highlights of the fascates
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera) //to render we will require two parameters --> 1. scene 2. camera
    controls.update();
}
animate();