"use client";
import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
import { loadModel } from "../../LoadModel";;
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Model = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const loadedModel = loadModel()
  // const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  useEffect(() => {
    sceneRef.current?.appendChild(loadedModel.renderer)
  },[loadedModel.renderer])

  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   const ambientlight = new THREE.AmbientLight(0xffffff);
  //   // var whiteLight = new THREE.PointLight(0xffffff, 1);
  //   // whiteLight.position.set(0, 0, 5);
  //   // scene.add(whiteLight);
  //   scene.background = new THREE.Color( 0xffffff );
  //   // const light = new THREE.PointLight(0xff0000, 1, 100);
  //   // light.position.set(50, 50, 50);
  //   // scene.add(light);
  //   scene.add(ambientlight);
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   camera.position.z = 2;

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   sceneRef.current?.appendChild(renderer.domElement);

  //   const loader = new GLTFLoader();
  //   loader.load(
  //     "../model/female model.glb",
  //     (gltf) => {
  //       // Check if there are animations in the gltf object
  //       if (gltf.animations && gltf.animations.length > 0) {
  //         mixerRef.current = new THREE.AnimationMixer(gltf.scene);
  //         const action = mixerRef.current.clipAction(gltf.animations[0]); // Assuming there is only one animation
  //         action.play();
  //       }
  //       scene.add(gltf.scene);
  //       // console.log(gltf.animations)
  //     },
  //     function (xhr) {
  //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     // Update the animation mixer
  //     if (mixerRef.current) {
  //       mixerRef.current.update(0.016); // Assuming a frame rate of 60fps
  //     }
  //     renderer.render(scene, camera);
  //   };

  //   animate();

  //   const handleResize = () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  //   // console.log("Loading time ");
  // }, []); // Empty dependency array ensures the useEffect runs only once

  return (
    <>
      <div ref={sceneRef} />
    </>
  );
};

export default Model;
