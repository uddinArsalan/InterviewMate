"use client";
import React,{useContext, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { ModelContext } from "@/app/context/ModelContextProvider";
// import { SpeechProducer } from "@/app/utils/Speech";

const StartInterView = () => {
  const context = useContext(ModelContext)
  if (!context) {
    throw new Error("ModelContext not found!");
  }
  const {setShowModel} = context;
  // useEffect(() => {
  //   const newSpeech = new SpeechProducer(1,1,"Google US English");
  //   newSpeech.initialiseSpeechSynthesis("Arsalan are you there we love you keep building one day you will be big enough ")
  //   console.log(newSpeech)
  // },[])
  return (
    <Button
      className="p-6"
      variant="outline"
      onClick={() => setShowModel((prev: boolean) => !prev)}
    >
      Start Interview
    </Button>
  );
};

export default StartInterView;
