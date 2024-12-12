const volume = 3.8;

export default class Osc {
  context: AudioContext;
  ampSqu: GainNode;
  ampSin: GainNode;
  oscSqu: OscillatorNode;
  oscSin: OscillatorNode;
  ampSquMute: boolean;
  ampSinMute: boolean;
  mute: boolean;

  constructor(audioCtx: AudioContext) {
    this.context = audioCtx;
    this.ampSqu = audioCtx.createGain();
    this.ampSin = audioCtx.createGain();
    this.oscSqu = audioCtx.createOscillator();
    this.oscSin = audioCtx.createOscillator();
    this.ampSquMute = false;
    this.ampSinMute = false;
    this.mute = false;

    this.init();
  }

  init() {
    // set square wave amp attributes
    this.ampSqu.connect(this.context.destination, this.context.currentTime);
    this.ampSqu.gain.setValueAtTime(volume, this.context.currentTime);

    // set square wave amp attributes
    this.ampSin.connect(this.context.destination, this.context.currentTime);
    this.ampSin.gain.setValueAtTime(volume, this.context.currentTime);

    // set square wave oscillator attributes
    this.oscSqu.type = "triangle";
    this.oscSqu.frequency.setValueAtTime(400, this.context.currentTime);
    this.oscSqu.connect(this.ampSqu);

    // set sin wave oscillator attributes
    this.oscSin.type = "sine";
    this.oscSin.frequency.setValueAtTime(400, this.context.currentTime);
    this.oscSin.connect(this.ampSin);
  }

  play() {
    console.log("Play started");
    this.oscSqu.start();
    this.oscSin.start();
  }

  setOscSquFreq(freq: number) {
    this.oscSqu.frequency.setValueAtTime(freq, this.context.currentTime);
  }

  setOscSinFreq(freq: number) {
    this.oscSin.frequency.setValueAtTime(freq, this.context.currentTime);
  }

  toggleAmpSqu() {
    this.ampSqu.gain.setValueAtTime(this.ampSquMute ? volume : 0, this.context.currentTime);
    this.ampSquMute = !this.ampSquMute;
  }

  toggleAmpSin() {
    this.ampSin.gain.setValueAtTime(this.ampSinMute ? volume : 0, this.context.currentTime);
    this.ampSinMute = !this.ampSinMute;
  }

  toggleMute() {
    if (this.mute == false) {
      this.ampSqu.gain.setValueAtTime(0, this.context.currentTime);
      this.ampSin.gain.setValueAtTime(0, this.context.currentTime);
    } else {
      this.ampSqu.gain.setValueAtTime(volume, this.context.currentTime);
      this.ampSin.gain.setValueAtTime(volume, this.context.currentTime);
    }
    this.mute = !this.mute;
    return this.mute;
  }
}
