import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadModel = () => {
    const scene = new THREE.Scene();
    const ambientlight = new THREE.AmbientLight(0xffffff);
    // var whiteLight = new THREE.PointLight(0xffffff, 1);
    // whiteLight.position.set(0, 0, 5);
    // scene.add(whiteLight);
    scene.background = new THREE.Color( 0xffffff );
    // const light = new THREE.PointLight(0xff0000, 1, 100);
    // light.position.set(50, 50, 50);
    // scene.add(light);
    scene.add(ambientlight);
    let mixerRef : THREE.AnimationMixer;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // sceneRef.current?.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "../model/female model.glb",
      (gltf) => {
        // Check if there are animations in the gltf object
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef = new THREE.AnimationMixer(gltf.scene);
          const action = mixerRef.clipAction(gltf.animations[0]); // Assuming there is only one animation
          action.play();
        }
        scene.add(gltf.scene);
        // console.log(gltf.animations)
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error(error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      // Update the animation mixer
      if (mixerRef) {
        mixerRef.update(0.016); // Assuming a frame rate of 60fps
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return { renderer: renderer.domElement };
}