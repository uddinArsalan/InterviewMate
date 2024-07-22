import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadModel = (containerRef: React.RefObject<HTMLDivElement>) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  const modalGeometry = new THREE.PlaneGeometry(9.5, 8);
  const modalMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0 });
  const modal = new THREE.Mesh(modalGeometry, modalMaterial);
  modal.position.set(0, 0, -0.1);
  scene.add(modal);

  let mixer: THREE.AnimationMixer | null = null;

  const animate = () => {
    requestAnimationFrame(animate);

    if (mixer) {
      mixer.update(0.016);
    }

    renderer.render(scene, camera);
  };

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
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  const handleResize = () => {
    const container = containerRef.current;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  };

  const cleanup = () => {
    window.removeEventListener("resize", handleResize);
  };

  return { domElement: renderer.domElement, animate, handleResize, cleanup };
};