"use client";
import React, { useState } from "react";
import DomainDialog from "../(dialog)/DomainDialog";
import StartInterView from "../components/StartInterView";

const InterviewPreparationPanel = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="md:text-4xl text-3xl lg:text-5xl font-bold bg-clip-text bg-gradient-to-br dark:text-transparent from-green-400 font-serif to-green-900 lg:col-span-2 underline flex items-center">
        Start Your AI Interview{" "}
      </div>
      <StartInterView setShowModel={setShowModel} />
    </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="text-xs dark:text-gray-700">
          Give access to your microphone and web camera
        </div>
        <div className="flex gap-2 cursor-pointer text-green-700">
          <i className="fa-solid fa-microphone"></i>
          <i className="fa-solid fa-video"></i>
        </div>
        <DomainDialog />
      </div>
    </>
  );
};

export default InterviewPreparationPanel;
