import { SpeechProducer } from "@/utils/Speech";
import { startSpeechRecognition } from "./SpeechRecognition";

export async function isRecordingActive(): Promise<boolean> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputDevices = devices.filter(
      (device) => device.kind === "audioinput"
    );

    for (const device of audioInputDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: device.deviceId },
        });
        const tracks = stream.getAudioTracks();

        if (tracks.length > 0 && tracks[0].readyState === "live") {
          tracks.forEach((track) => track.stop());
          return true;
        }

        tracks.forEach((track) => track.stop());
      } catch (error) {
        console.error("Error checking device:", device.deviceId, error);
      }
    }

    return false;
  } catch (error) {
    console.error("Error enumerating devices:", error);
    return false;
  }
}

async function startInterviewAudio(question: string, voice: string) {
  if (await isRecordingActive()) {
    throw new Error(
      "A recording is currently active. Please stop the recording before starting the interview."
    );
  }
  const speech = new SpeechProducer(voice);
  await speech.speakThis(question);
  const userAnswer = await startSpeechRecognition();
  return userAnswer;
}

export { startInterviewAudio };
