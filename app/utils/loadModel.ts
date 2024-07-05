import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadModel = (): { domElement: HTMLCanvasElement } => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  // const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  // const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#333333" });
  // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // scene.add(cube);

  const modalGeometry = new THREE.PlaneGeometry(9.5, 8);
  const modalMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0 });
  const modal = new THREE.Mesh(modalGeometry, modalMaterial);
  modal.position.set(0, 0, -0.1);
  scene.add(modal);

  let mixer: THREE.AnimationMixer | null = null;

  const animate = () => {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    if (mixer) {
      mixer.update(0.016);
    }

    renderer.render(scene, camera);
  };

  animate();

  const loader = new GLTFLoader();
  loader.load(
    "../model/interviewmate.glb",
    (gltf) => {
      const character = gltf.scene;
      character.scale.set(5, 5, 5);
      character.position.set(0, -7.5, 0);
      scene.add(character);
      console.log("Model loaded successfully", character);

      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(character);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      } else {
        console.log("No animations found in the model");
      }
    },
    (xhr: ProgressEvent<EventTarget>) => {
      console.log((xhr.loaded / (xhr.total || 1)) * 100 + "% loaded");
      // scene.remove(cube);
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleResize);

  return { domElement: renderer.domElement };
};
