"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModel } from "@/context/ModelContextProvider";
import { startInterviewSession, storeUserQuestions } from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import "./styles/style.css";
import { useApp } from "@/context/AppProvider";
import toast from "react-hot-toast";
import CheckList from "./Checkbox";

interface QuestionData {
  question: string;
  questionNumber: number;
}

const DomainDialog = () => {
  const {
    currentUser,
    currentUserId,
    openDomainDialog,
    toggleDomainSelectionDialogBox,
    closeDialogBox,
    startLoader,
    completeLoader,
    domainValue,
    updateInterviewSessionId,
    updateQuestionIdArray,
    interviewSessionId
  } = useApp();
  const { setStep } = useModel();

  const generateQuestions = async (interviewId: number): Promise<string> => {
    try {
      const res = await toast.promise(
        fetch(`/api/cohereai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: domainValue,
            user: currentUser,
            interviewId,
          }),
        }),
        {
          loading: "Generating question...",
          success: "Question generated successfully 👌",
          error: "Failed to generate question 🤯",
        }
      );
  
      if (!res.ok) {
        setStep((prevSteps) => ({ ...prevSteps, isInterviewStarted: false }));
        throw new Error("Failed to generate questions");
      }
  
      const { question, questionNumber }: QuestionData = await res.json();
      console.log(question, questionNumber);
      return question;
    } catch (error) {
      console.error("Error in generateQuestions:", error);
      throw error; 
    }
  };
  
  const handleQuestion = async (interviewId: number) => {
    const loaderId = startLoader();

    try {
      const question = await generateQuestions(interviewId);
      if (currentUser && question && question !== undefined) {
        const questionId: number = await storeUserQuestions(
          currentUserId,
          interviewId,
          question
        );
        updateQuestionIdArray(questionId);
        toast.success("Questions generated and inserted successfully");
        setStep((prev) => ({ ...prev, isDomainSelected: true }));
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
      setStep((prev) => ({ ...prev, isDomainSelected: false }));
    } finally {
      completeLoader(loaderId);
    }
  };

  const startInterview = async () => {
    closeDialogBox();
    const loaderId = startLoader();
    let interviewId : number;
    try {
      if (!currentUser || !currentUserId) {
        toast.error("Please Signup First");
        return;
      }
      if(interviewSessionId === 0){
        interviewId = await startInterviewSession(currentUserId, domainValue);
        console.log(interviewId);
        console.log(`Interview started with ID: ${interviewId}`);
        if(interviewId){
          updateInterviewSessionId(interviewId);
          await handleQuestion(interviewId);
        } 
      }
      else {
        console.log(`Interview started with ID: ${interviewSessionId}`);
        await handleQuestion(interviewSessionId);
      } 
    } catch (error) {
      console.error("Error starting interview session:", error);
      setStep((prev) => ({ ...prev, isDomainSelected: false }));
    } finally {
      completeLoader(loaderId);
    }
  };

  return (
    <Dialog open={openDomainDialog} onOpenChange={toggleDomainSelectionDialogBox}>
    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] bg-white dark:bg-gray-800 overflow-hidden">
      <DialogHeader className="pb-4">
        <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Select Your Domain
        </DialogTitle>
        <DialogDescription className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Choose the domain that best fits your expertise and interests.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[50vh] pr-4 overflow-y-auto">
        <CheckList  />
      </ScrollArea>
      <DialogFooter className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          onClick={closeDialogBox}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
          onClick={startInterview}
          disabled={!domainValue}
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
};

export default DomainDialog;
