"use client";
import React from 'react';
import { useModel } from '@/app/context/ModelContextProvider';
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
      {isInterviewStarted && !isCharacterSelected && <ChooseModelSection />}
      {isCharacterSelected && !isDomainSelected && <DomainDialog />}
      {isAllStepsCompleted && <InterviewModel />}
    </div>
  )
}

export default InterviewSteps