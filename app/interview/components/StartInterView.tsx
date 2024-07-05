"use client";
import React,{useContext, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { useModel } from "@/app/context/ModelContextProvider";
// import { SpeechProducer } from "@/app/utils/Speech";

const StartInterView = () => {
  const {step,setStep} = useModel();
  // useEffect(() => {
  //   const newSpeech = new SpeechProducer(1,1,"Google US English");
  //   newSpeech.initialiseSpeechSynthesis("Arsalan are you there we love you keep building one day you will be big enough ")
  //   console.log(newSpeech)
  // },[]);
  const { isInterviewStarted } = step;
  const handleInterviewStart = () => {
    setStep(prev => ({...prev,isInterviewStarted : !prev.isInterviewStarted}))
  }
  return (
    <Button
      className="p-6"
      variant="outline"
      onClick={handleInterviewStart}
    >
      {isInterviewStarted ? "Pause Interview" : "Start Interview"}
    </Button>
  );
};

export default StartInterView;
