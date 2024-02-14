"use client";
import React,{useContext} from "react";
import { Button } from "@/components/ui/button";
import { ModelContext } from "@/app/context/ModelContextProvider";

const StartInterView = () => {
  const context = useContext(ModelContext)
  if (!context) {
    throw new Error("ModelContext not found!");
  }
  const {setShowModel} = context
  return (
    <Button
      className="p-6"
      variant="outline"
      onClick={() => setShowModel((prev: boolean) => !prev)}
    >
      Start Interview....
    </Button>
  );
};

export default StartInterView;
