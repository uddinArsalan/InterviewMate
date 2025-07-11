import { SpeechProducer } from "@/utils/Speech";
import {
  getIsRecognizing,
  startSpeechRecognition,
  stopSpeechRecognition,
} from "./SpeechRecognition";
import toast from "react-hot-toast";

async function startInterviewAudio(
  question: string,
  voice: string,
  isAudioOn: boolean,
  toggleAudio?: () => void
) {
  if (getIsRecognizing()) {
    stopSpeechRecognition();
    await new Promise((res) => setTimeout(res, 300));
  }
  const speech = new SpeechProducer(voice);
  await speech.speakThis(question);
  if (!isAudioOn && toggleAudio) {
    toast.error("Audio is off. Please enable audio to continue the interview.");
    toggleAudio();
  }
  return await startSpeechRecognition();
}

export { startInterviewAudio };
