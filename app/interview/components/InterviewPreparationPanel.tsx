"use client";
import React from "react";
import DomainDialog from "../(dialog)/DomainDialog";
import StartInterView from "../components/StartInterView";
import SolutionTabs from "./SolutionTabs"

const InterviewPreparationPanel = () => {
  return (
    <>
    <div className="p-4 md:p-8 flex flex-wrap md:justify-between justify-center gap-6 items-center">
    <div className="flex flex-col gap-4">
      <div className="md:text-4xl text-3xl lg:text-5xl font-bold bg-clip-text bg-gradient-to-br dark:text-transparent from-green-400 font-serif to-green-900 lg:col-span-2 underline flex items-center">
        Start Your AI Interview{" "}
      </div>
      <StartInterView />
    </div>
      <div className="flex flex-col gap-2 items-center mt-8">
        <div className="text-xs dark:text-gray-700">
          Give access to your microphone and web camera
        </div>
        <div className="flex gap-2 cursor-pointer text-green-700">
          <i className="fa-solid fa-microphone"></i>
          <i className="fa-solid fa-video"></i>
        </div>
        <DomainDialog />
      </div>

    </div>
      <div className="md:text-4xl text-2xl lg:text-4xl text-center text-green-800 font-extrabold mt-8 mb-0">
          OR
        </div>
        <div className="flex flex-col p-2 md:p-4 lg:p-8 w-full">
          <div className="text-3xl mb-4 md:text-4xl font-extrabold text-green-800 text-center">
            Submit Your Solution in text format
          </div>
          <SolutionTabs />
        </div>
    </>
  );
};

export default InterviewPreparationPanel;
