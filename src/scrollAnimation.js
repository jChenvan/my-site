import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import mechanism from '/mechanism.glb?url';

const scrollAnimation = (function() {
    const container = document.querySelector('.scroll-animation');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const shrinkFactor = 150;
    const cam = new THREE.OrthographicCamera(width/-shrinkFactor,width/shrinkFactor,height/shrinkFactor,height/-shrinkFactor,1,1000);
    const radius = 10;
    const theta = Math.PI/5;
    const phi = Math.PI/6;
    const camPos = new THREE.Vector3(
        radius*Math.cos(theta)*Math.sin(phi),
        radius*Math.sin(theta)*Math.sin(phi),
        radius*Math.cos(phi)
    );
    cam.position.set(camPos.x,camPos.y,camPos.z);
    cam.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width,height);
    container.appendChild(renderer.domElement);

    const directional1 = new THREE.DirectionalLight(0xff00ff,3);
    const directional2 = new THREE.DirectionalLight(0xff00ff,1);
    directional1.position.set(1,0.5,-3);
    directional2.position.set(-3,0.5,1);
    const ambient = new THREE.AmbientLight(0x0000ff);
    scene.add(ambient,directional1,directional2);

    const loader = new GLTFLoader();
    let mixer;
    loader.load(mechanism,function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        const animations = gltf.animations;
        console.log(animations);
        mixer = new THREE.AnimationMixer(model);
        animations.forEach(item=>{
            const action = mixer.clipAction(item);
            action.play();
        });

        console.log(gltf.scene);
    },undefined,function (err) {console.error(err)});

    const clock = new THREE.Clock();

    let lastScrollPos;
    const windSpeedFactor = 0.005;

    document.body.onscroll = ()=>{
        if (mixer && lastScrollPos) mixer.update(windSpeedFactor*(window.scrollY-lastScrollPos));
        lastScrollPos = window.scrollY; 
    };

    function animate() { 
        renderer.render(scene,cam);
    }
    renderer.setAnimationLoop(animate);

    return {
        update: function (amt) {if (mixer) mixer.update(amt)},
        resize: function (width,height) {
            cam.left = width/-shrinkFactor;
            cam.right = width/shrinkFactor;
            cam.up = height/-shrinkFactor;
            cam.down = height/shrinkFactor;
            cam.updateProjectionMatrix();

            renderer.setSize(width,height);
        }
    }
})()

export default scrollAnimation;