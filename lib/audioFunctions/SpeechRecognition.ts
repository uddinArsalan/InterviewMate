function startSpeechRecognition(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      reject('Speech recognition not supported in this environment');
      return;
    }
  
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    let final_transcript = "";
  
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = "en-IN"
  
    recognition.onaudiostart = () => {
      console.log("Audio capturing started");
    };
  
    recognition.onaudioend = () => {
      console.log("Audio capturing ended");
    };
    recognition.onspeechend = () => {
      recognition.stop(); 
    };
  
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // let interim_transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript + " ";
          console.log("Transcript updated:", final_transcript);
      }
      }
      console.log("Recognized Speech (final):", final_transcript);
      // console.log("Recognized Speech (interim):", interim_transcript);
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended");
      resolve(final_transcript.trim());
    };
  
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      reject(event.error);
    };
  
    recognition.start();
  });
}

export { startSpeechRecognition };