"use client";
import React from 'react';
import { useModel } from '@/context/ModelContextProvider';
import ChooseModelSection from './ChooseModelSection';
import DomainDialog from './(dialog)/DomainDialog';
import InterviewModel from './(Model3d)/InterviewModel';
import InterviewPanel from './InterviewPanel';

const InterviewSteps = () => {
  const { step, isAllStepsCompleted } = useModel();
  const { isInterviewStarted, isCharacterSelected, isDomainSelected } = step;

  return (
    <div>
      {!isInterviewStarted && <InterviewPanel />}
      {isInterviewStarted && !isDomainSelected && <DomainDialog />}
      {isDomainSelected && !isCharacterSelected && <ChooseModelSection />}
      {isAllStepsCompleted && <InterviewModel />}
    </div>
  )
}

export default InterviewSteps