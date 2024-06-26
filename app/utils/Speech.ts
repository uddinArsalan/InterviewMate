type PitchType = 0 | 1 | 2 | 1.5;

export class SpeechProducer {
  rate = 1;
  pitch : PitchType = 1;
  voice_name = "";
  static synth = window.speechSynthesis;
  randomNumber = Math.floor(Math.random() * SpeechProducer.synth.getVoices().length) + 1;
  constructor (pitch: PitchType, rate: number, voice_name: string) {
    this.pitch = pitch;
    this.rate = rate;
    this.voice_name = voice_name;
  }

 private getAllVoices() {
    const voices = SpeechProducer.synth.getVoices();
    return voices;
  }


  private getVoice() {
    const allVoicesAvaliable = this.getAllVoices();
    if (allVoicesAvaliable) {
      const voice = allVoicesAvaliable.find(
        (voices) => voices.name === this.voice_name
      );
      if (!voice) return undefined;
      else return voice;
    }
  }

  initialiseSpeechSynthesis(textContent: string) {
    const utterThis = new SpeechSynthesisUtterance(textContent);
    const userSelectedVoice = this.getVoice();
    const allVoicesAvaliable = this.getAllVoices();
    if (SpeechProducer.synth.onvoiceschanged !== undefined) {
        SpeechProducer.synth.onvoiceschanged = this.getAllVoices;
      }
    if (userSelectedVoice === undefined)
      utterThis.voice = allVoicesAvaliable[this.randomNumber];
    else utterThis.voice = userSelectedVoice;

    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    SpeechProducer.synth.speak(utterThis);
  }
}
