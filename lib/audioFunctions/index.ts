import { SpeechProducer } from "@/utils/Speech";
import { startSpeechRecognition } from "./SpeechRecognition";

async function startInterviewAudio(question: string, voice: string) {
    const speech = new SpeechProducer(voice);
    console.log("Voice name ", voice);
    await speech.speakThis(question);
    const userAnswer = await startSpeechRecognition();
    return userAnswer; 
}

export { startInterviewAudio };
