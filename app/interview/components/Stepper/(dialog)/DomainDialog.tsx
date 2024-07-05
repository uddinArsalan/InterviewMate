"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModel } from "@/app/context/ModelContextProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Check from "./Checkbox";
import "./styles/style.css";
import { useApp } from "@/app/context/AppProvider";
import toast from "react-hot-toast"

const DomainDialog = () => {
  const [value, setValue] = useState("");
  const { currentUser, openDomainDialog, toggleDomainSelectionDialogBox, closeDialogBox, startLoader, completeLoader } = useApp();
  const { setStep } = useModel();

  const generateQuestions = async (): Promise<string> => {
    const res = await fetch(`/api/cohereai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain: value, user: currentUser }),
    });
    if (!res.ok) {
      throw new Error("Failed to generate questions");
    }
    return res.json();
  };

  const insertQuestions = async (questionText: string): Promise<void> => {
    const res = await fetch(`/api/insert-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domainValue: value,
        questions_text: questionText,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to insert questions");
    }
  };

  const handleQuestion = async () => {
    closeDialogBox();
    const loaderId = startLoader();

    try {
      const questions = await generateQuestions();
      if (questions && questions !== undefined) {
        await insertQuestions(questions);
        toast.success("Questions generated and inserted successfully");
        setStep(prev => ({ ...prev, isDomainSelected: true }));
      } else {
        throw new Error("No questions were generated");
      }
    } catch (error: unknown) {
      console.error("An error occurred:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setStep(prev => ({ ...prev, isDomainSelected: false }));
    } finally {
      completeLoader(loaderId);
    }
  };

  return (
    <Dialog open={openDomainDialog} onOpenChange={toggleDomainSelectionDialogBox}>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[80vh] bg-white dark:bg-gray-800 overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Select Your Domain
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 dark:text-gray-300">
            Choose the domain that best fits your expertise and interests.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh] pr-4">
          <Check value={value} setValue={setValue} />
        </ScrollArea>
        <DialogFooter className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => {
              closeDialogBox();
              setStep(prev => ({...prev, isCharacterSelected: false}));
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            onClick={handleQuestion}
            disabled={!value}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default DomainDialog;
