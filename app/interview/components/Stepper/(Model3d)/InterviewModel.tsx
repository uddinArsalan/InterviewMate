"use client";
import React, { useRef, useEffect } from "react";
import { loadModel } from "@/app/utils/loadModel";

const InterviewModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { domElement } = loadModel();
      containerRef.current.appendChild(domElement);

      return () => {
        if (containerRef.current && domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(domElement);
        }
      };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default InterviewModel;
