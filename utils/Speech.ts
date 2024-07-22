type PitchType = 0 | 1 | 2 | 1.5;

export class SpeechProducer {
  private static synth: SpeechSynthesis | null = null;
  private rate = 1;
  private pitch: PitchType = 1;
  private voice_name: string;
  private randomNumber: number = 0;
  static isFinishedSpeaking: boolean = false;

  constructor(voice_name: string) {
    this.voice_name = voice_name;
  }

  isAudioStopped(): boolean {
    return SpeechProducer.isFinishedSpeaking;
  }

  private static getSynth(): SpeechSynthesis {
    if (typeof window !== 'undefined' && !SpeechProducer.synth) {
      SpeechProducer.synth = window.speechSynthesis;
    }
    return SpeechProducer.synth as SpeechSynthesis;
  }

  private getAllVoices(): SpeechSynthesisVoice[] {
    return SpeechProducer.getSynth().getVoices();
  }

  private getVoice(): SpeechSynthesisVoice | undefined {
    const allVoicesAvailable = this.getAllVoices();
    return allVoicesAvailable.find((voice) => voice.name === this.voice_name);
  }

  speakThis(textContent: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        console.warn('Speech synthesis is not available on the server side.');
        reject('Speech synthesis is not available on the server side.');
        return;
      }

      const utterThis = new SpeechSynthesisUtterance(textContent);
      const userSelectedVoice = this.getVoice();
      const allVoicesAvailable = this.getAllVoices();

      if (SpeechProducer.getSynth().onvoiceschanged !== undefined) {
        SpeechProducer.getSynth().onvoiceschanged = this.getAllVoices;
      }

      if (!this.randomNumber) {
        this.randomNumber = Math.floor(Math.random() * allVoicesAvailable.length);
      }

      utterThis.voice = userSelectedVoice || allVoicesAvailable[this.randomNumber];
      utterThis.pitch = this.pitch;
      utterThis.rate = this.rate;

      utterThis.onend = function(event) {
        console.log('Speech has finished');
        SpeechProducer.isFinishedSpeaking = true;
        resolve();
      };

      utterThis.onerror = function(event) {
        console.error('Speech synthesis error', event.error);
        reject(event.error);
      };

      SpeechProducer.getSynth().speak(utterThis);
    });
  }
}
