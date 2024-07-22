import React from "react";
import UserMedia from "./(Media)/UserMedia";
import { ArrowRight, Calendar, UserCheck, MessageCircle } from 'lucide-react';
import { useModel } from "@/context/ModelContextProvider";
import { useApp } from "@/context/AppProvider";

interface FeatureProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4">
  <div className="flex-shrink-0">
    <Icon className="w-6 h-6 text-green-500 dark:text-green-400" />
  </div>
  <div>
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
</div>
);

const InterviewPanel = () => {
  const {step,setStep} = useModel();
  const { isInterviewStarted } = step;
  const {toggleDomainSelectionDialogBox} = useApp();
  const handleStartInterview = () => {
    setStep(prev => ({...prev,isInterviewStarted : !prev.isInterviewStarted}));
    toggleDomainSelectionDialogBox();

  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <div className="w-full md:w-1/2 p-4 md:p-8">
      <UserMedia />
    </div>

    <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Welcome to Interview Mate
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        Prepare for success with our AI-powered interview practice.
      </p>
      
      <div className="space-y-6 mb-10">
        <Feature 
          Icon={Calendar} 
          title="Schedule Flexibly" 
          description="Practice interviews anytime, anywhere."
        />
        <Feature 
          Icon={UserCheck} 
          title="Personalized Feedback" 
          description="Receive instant, tailored advice to improve."
        />
        <Feature 
          Icon={MessageCircle} 
          title="Real-time Interactions" 
          description="Engage with our AI just like a real interviewer."
        />
      </div>
      
      <button
        onClick={handleStartInterview}
        className="flex items-center justify-center space-x-2 bg-green-700 dark:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 dark:hover:bg-green-600 transition duration-300"
      >
        <span>{isInterviewStarted ? 'Continue Interview' : 'Start Your Interview'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
  );
};

export default InterviewPanel;
