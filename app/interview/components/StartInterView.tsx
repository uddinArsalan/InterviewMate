"use client";
import React, { SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface propsTypes {
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>
}

const StartInterView = ({
  setShowModel ,
} : propsTypes) => {
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
