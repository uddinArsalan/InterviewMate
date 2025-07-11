import {useMemo} from "react";
import { StopIcon, ForwardIcon } from "@heroicons/react/24/solid";
import { stopInterviewSession } from "@/lib/db";
import { useApp } from "@/context/AppProvider";
import { useModel } from "@/context/ModelContextProvider";
import { useInterviewAudio } from "@/hooks/useInterviewAudio";

const InterviewControls = () => {
  const { interviewSessionId, startLoader, completeLoader } = useApp();
  const {currentQuestionNumber} = useInterviewAudio();
  const { setStep } = useModel();
  const stopInterview = async () => {
    const loaderId = startLoader();
    try {
      await stopInterviewSession(interviewSessionId);
    } catch (err) {
      console.log("Error ending interview", err);
      throw err;
    } finally {
      setStep((prevSteps) => ({
        ...prevSteps,
        isInterviewStarted: false,
        isDomainSelected: false,
        isCharacterSelected: false,
      }));
      completeLoader(loaderId);
    }
  };
  const progressPecentage = useMemo(() => (currentQuestionNumber / 10) * 100, [currentQuestionNumber])
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Interview Progress
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={stopInterview}
          >
            <StopIcon className="w-5 h-5" />
          </button>
          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            <ForwardIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPecentage}%` }}
        ></div>
      </div>
      {/* <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-right">
        Question 5 of 10
      </div> */}
    </div>
  );
};

export default InterviewControls;
