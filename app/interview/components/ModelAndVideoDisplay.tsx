"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Video from "../(video)/Video";
import Model from "../(Model)/Model";
import { ModelContext } from "@/app/context/ModelContextProvider";

const ModelAndVideoDisplay = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("ModelContext not found!");
  }
  const { showModel } = context;
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      {showModel ? (
        <Model />
      ) : (
        <Image
          src={`https://source.unsplash.com/1200x600/?interview&n=${Date.now()}/`}
          className="md:object-cover object-contain"
          alt="interview-section"
          width={1200}
          height={300}
        ></Image>
      )}
      {/* <Video /> */}
    </div>
  );
};

export default ModelAndVideoDisplay;
