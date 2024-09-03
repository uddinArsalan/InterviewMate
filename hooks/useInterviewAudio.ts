import { useApp } from "@/context/AppProvider";
import { startInterviewAudio } from "@/lib/audioFunctions";
import { useCallback ,useState } from "react";
import {
  getUserQuestions,
  storeUserAnswers,
  storeUserQuestions,
} from "@/lib/db";
export const useInterviewAudio = () => {
    const {
      characterVoice,
      questionIds,
      currentUser,
      interviewSessionId,
      domainValue,
      updateQuestionIdArray,
    } = useApp();
  
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  
    const generateQuestions = useCallback(async (
      interviewId: number,
      userResponse: string,
      currentQuestionNumber: number
    ): Promise<string> => {
      const res = await fetch(`/api/cohereai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domainValue,
          user: currentUser,
          interviewId,
          userResponse,
          currentQuestionNumber,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate questions");
      }
      const { question }: { question: string } = await res.json();
      return question;
    }, [domainValue, currentUser]);
  
    const initInterviewAudio = useCallback(async () => {
      if (!currentUser || !interviewSessionId) {
        console.error("User or interview session not initialized");
        return;
      }
    
      const askQuestion = async (questionId: number) => {
        try {
          const question = await getUserQuestions(currentUser, questionId);
          if (!question) {
            console.error("No question available");
            return;
          }
    
          const userAnswer = await startInterviewAudio(question, characterVoice);
          if (!userAnswer) {
            console.error("No user answer received");
            return;
          }
    
          await storeUserAnswers(
            currentUser,
            interviewSessionId,
            questionId,
            userAnswer
          );
    
          const nextQuestion = await generateQuestions(
            interviewSessionId,
            userAnswer,
            currentQuestionNumber
          );
    
          if (nextQuestion) {
            const nextQuestionId: number = await storeUserQuestions(
              currentUser,
              interviewSessionId,
              nextQuestion
            );
            updateQuestionIdArray(nextQuestionId);
            setCurrentQuestionNumber((prev) => prev + 1);
            
            await askQuestion(nextQuestionId);
          }
        } catch (error) {
          console.error("Error in interview process:", error);
        }
      };
    
      const latestQuestionIdToAskToUser = questionIds[questionIds.length - 1];
      await askQuestion(latestQuestionIdToAskToUser);
    }, [
      currentUser, 
      interviewSessionId, 
      questionIds, 
      characterVoice, 
      currentQuestionNumber, 
      generateQuestions, 
      updateQuestionIdArray
    ]);
  
    return { initInterviewAudio, currentQuestionNumber };
  };