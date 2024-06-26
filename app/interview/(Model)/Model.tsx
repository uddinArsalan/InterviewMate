"use client";
import React, { useRef, useEffect } from "react";
import { loadModel } from "../LoadModel";

const Model = () => {
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

export default Model;
