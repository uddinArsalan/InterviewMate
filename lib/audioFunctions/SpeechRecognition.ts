let recognitionInstance: SpeechRecognition | null = null;
let isRecognizing = false;

function startSpeechRecognition(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (
      typeof window === "undefined" ||
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      reject("Speech recognition not supported");
      return;
    }

    if (isRecognizing) {
      reject("Recognition already running");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionInstance = recognition;
    isRecognizing = true;

    let final_transcript = "";

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript + " ";
        }
      }
    };

    recognition.onend = () => {
      isRecognizing = false;
      recognitionInstance = null;
      resolve(final_transcript.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      isRecognizing = false;
      recognitionInstance = null;
      reject(event.error);
    };

    recognition.start();
  });
}

function stopSpeechRecognition() {
  if (recognitionInstance && isRecognizing) {
    recognitionInstance.stop();
    recognitionInstance = null;
    isRecognizing = false;
  }
}

function getIsRecognizing() {
  return isRecognizing;
}

export { startSpeechRecognition, stopSpeechRecognition, getIsRecognizing };
