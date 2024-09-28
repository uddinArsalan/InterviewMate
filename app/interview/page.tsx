import React from "react";
import ModelContextProvider from "../../context/ModelContextProvider";
import InterviewPreparationPanel from "./components/InterviewPreparationPanel";
import InterviewSteps from "./components/Stepper/Steps";

const page = () => {
  return (
    <>
      <ModelContextProvider>
        <div className="dark:bg-[#000000] flex flex-col gap-8 p-4 md:p-6">
          <InterviewSteps />
          <div>
            <InterviewPreparationPanel />
          </div>
        </div>
      </ModelContextProvider>
    </>
  );
};

export default page;
