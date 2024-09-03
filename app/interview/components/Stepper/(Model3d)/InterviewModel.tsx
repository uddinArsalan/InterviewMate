import React, { useRef, useEffect, useState } from "react";
// import { loadModel } from "@/utils/loadModel";
import UserMedia from "../(Media)/UserMedia";
import Avatar3D from "./Avatar3D";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import { useApp } from "@/context/AppProvider";
import { useInterviewAudio } from "../../../../../hooks/useInterviewAudio";
import InterviewControls from "./InterviewControls";
import toast from "react-hot-toast";

const InterviewModel = () => {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { initInterviewAudio } = useInterviewAudio();
  const { startLoader, completeLoader, questionIds } = useApp();

  // useEffect(() => {
  //   const loaderId = startLoader();
  //   if (containerRef.current) {
  //     const { domElement, animate, handleResize, cleanup } =
  //       loadModel(containerRef);
  //     containerRef.current.appendChild(domElement);

  //     animate();
  //     handleResize();
  //     window.addEventListener("resize", handleResize);
  //     completeLoader(loaderId);

  //     return () => {
  //       cleanup();
  //       if (
  //         containerRef.current &&
  //         domElement.parentNode === containerRef.current
  //       ) {
  //         containerRef.current.removeChild(domElement);
  //       }
  //     };
  //   }
  // }, []);

  useEffect(() => {
    // if (containerRef.current) {
      initInterviewAudio()
        .then(() => {
          console.log("Interview Audio Started");
          toast.success("Interview Audio Started");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error in loading audio");
        });
    // }
  }, [questionIds]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-grow flex">
        {/* 3D Model View */}
        <div
          className={`relative ${
            isFullscreen ? "w-full" : "w-2/3"
          } bg-white dark:bg-gray-800 shadow-lg rounded-lg m-4 overflow-hidden`}
        >
          {/* <div ref={containerRef} className="w-full h-full" /> */}
          <Avatar3D />
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* User Media */}
        {!isFullscreen && (
          <div className="w-1/3 m-4">
            <UserMedia />
          </div>
        )}
      </div>

      <div className="m-4">
        <InterviewControls />
      </div>
    </div>
  );
};

export default InterviewModel;
