"use client";
import React, { useState, createContext, useContext } from "react";
import { stepsType } from "../interfaces";
interface ContextType {
  step: stepsType;
  setStep: React.Dispatch<React.SetStateAction<stepsType>>;
  isAllStepsCompleted: boolean;
}
export const ModelContext = createContext<ContextType>({
  step: {
    isInterviewStarted: true,
    isCharacterSelected: true,
    isDomainSelected: true,
  },
  setStep: () => {},
  isAllStepsCompleted: false,
});

export function useModel() {
  return useContext(ModelContext);
}

const ModelContextProvider = ({ children }: React.PropsWithChildren) => {
  const [step, setStep] = useState({
    isInterviewStarted: false,
    isDomainSelected: false,
    isCharacterSelected: false,
  });

  const isAllStepsCompleted =
    step.isInterviewStarted &&
    step.isDomainSelected &&
    step.isCharacterSelected;

  return (
    <ModelContext.Provider value={{ step, setStep, isAllStepsCompleted }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
