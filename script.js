//import THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//to allow camera top move
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//to allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//create a three js sceen
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a global object
let object;
//orbital controlls
let controls;

//set object to render
let objToRender = "scene";

//instantiate loader for file
const loader = new GLTFLoader();

//load file
loader.load(
    `${objToRender}.glb`,
    function (gltf) {
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        object.scale.set(3,3,3);
        scene.add(object);
    },
    function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error(error);
    }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: false }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("3Dcontainer").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "scene" ? 25 : 500;

const ambientLight = new THREE.AmbientLight(0xfffbe2, 75);
scene.add(ambientLight);

//directional light

const DL = new THREE.DirectionalLight(0xeeaf61, 1, 80, Math.PI / 8, 0)
DL.position.set(10, 10, 10);
DL.castShadow = true;
const DLhelper = new THREE.DirectionalLightHelper(DL);
//scene.add(DL, DLhelper);


// spot lights

const spotLight = new THREE.SpotLight(0xFA5F55, 1, 80, Math.PI / 8, 0);
spotLight.position.set(45, 30, 30);
spotLight.castShadow = true;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLight, spotLightHelper);

const spotLight1 = new THREE.SpotLight(0xeeaf61, 1, 80, Math.PI / 8, 0);
spotLight1.position.set(45, 30, 30);
spotLight1.castShadow = true;
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
//scene.add(spotLight1, spotLightHelper1);

const spotLight2 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight2.position.set(45, -50, 0);
spotLight2.castShadow = true;
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
//scene.add(spotLight2, spotLightHelper2);

const spotLight3 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight3.position.set(45, 26, -26);
spotLight3.castShadow = true;
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
//scene.add(spotLight3, spotLightHelper3);

scene.add(DL, spotLight, spotLight1, spotLight2, spotLight3);

//This adds controls to the camera, so we can rotate / zoom it with the mouse

if (objToRender === "scene") {
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(65,10,0);
    controls.enable = false;
    controls.enableRotate = false; // Disable rotation
    controls.enableZoom = false;   // Disable zooming
    controls.enablePan = false;    // Disable panning
}

document.body.onkeyup = function(e){
    if (e.keyCode == 75
    ) {
        console.log(scene.children[6].children);
        //console.log(camera.position);
        // camera.rotation.set(-1.5 , 0, 0);
        // console.log(camera.rotation);
    } 
}


let x;

x=true;


//Render the scene
function animate() {
    requestAnimationFrame(animate);
    if (x) {
        controls.update();
        
        scene.children[6].children[0].rotation.y += 0.002;
        scene.children[6].children[1].rotation.y += 0.002;
        scene.children[6].children[2].rotation.y += 0.002;
    }

    //controls.update();//position objects

    renderer.render(scene, camera);
    renderer.setSize(window.innerWidth, 500);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidthWidth, 600);
});

//Start the 3D rendering
animate();