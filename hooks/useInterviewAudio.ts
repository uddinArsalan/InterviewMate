import { useApp } from "@/context/AppProvider";
import { startInterviewAudio } from "@/lib/audioFunctions";
import { useCallback, useState } from "react";
import {
  getUserQuestions,
  storeUserAnswers,
  storeUserQuestions,
} from "@/lib/db";
import toast from "react-hot-toast";

export const useInterviewAudio = () => {
  const {
    characterVoice,
    questionIds,
    currentUser,
    interviewSessionId,
    domainValue,
    currentUserId,
    updateQuestionIdArray,
    isAudioOn,
    toggleAudio,
  } = useApp();

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  // const [isSpeaking, setIsSpeaking] = useState(false);

  const generateQuestions = useCallback(
    async (
      interviewId: number,
      userResponse: string,
      currentQuestionNumber: number
    ): Promise<string> => {
      try {
        const res = await toast.promise(
          fetch(`/api/cohereai`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              domain: domainValue,
              user: currentUser,
              interviewId,
              userResponse,
              currentQuestionNumber,
            }),
          }),
          {
            loading: "Generating follow-up question...",
            success: "Follow-up question generated successfully 👌",
            error: "Failed to generate follow-up question 🤯",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to generate questions");
        }

        const { data } = await res.json();
        const { question }: { question: string } = data;
        return question;
      } catch (error) {
        console.error("Error in generateQuestions (useCallback):", error);
        throw error;
      }
    },
    [domainValue, currentUser]
  );

  const initInterviewAudio = useCallback(async () => {
    if (!currentUser || !interviewSessionId) {
      console.error("User or interview session not initialized");
      return;
    }

    const askQuestion = async (questionId: number) => {
      try {
        const question = await getUserQuestions(questionId);
        if (!question) {
          console.error("No question available");
          return;
        }
        const userAnswer = await startInterviewAudio(question, characterVoice,isAudioOn, toggleAudio);
        if (!userAnswer) {
          console.error("No user answer received");
          return;
        }
        await storeUserAnswers(currentUserId,interviewSessionId, questionId, userAnswer);

        const nextQuestion = await generateQuestions(
          interviewSessionId,
          userAnswer,
          currentQuestionNumber
        );

        if (nextQuestion) {
          const nextQuestionId: number = await storeUserQuestions(
            currentUserId,
            interviewSessionId,
            nextQuestion
          );
          if(nextQuestionId == -1){ 
            toast.error("User is not signup")
            return;
          };
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
    currentUserId,
    interviewSessionId,
    questionIds,
    characterVoice,
    currentQuestionNumber,
    generateQuestions,
    updateQuestionIdArray,
  ]);

  return { initInterviewAudio, currentQuestionNumber };
};
