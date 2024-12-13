// const defaultVolume = 3.8;
const defaultVolume = 0.2;

export default class OscillatorChain {
  context: AudioContext;
  amp: GainNode;
  osc: OscillatorNode;
  waveForm: OscillatorType;
  frequency: number;
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;

  constructor(audioCtx: AudioContext, waveForm?: OscillatorType) {
    this.context = audioCtx;
    this.amp = audioCtx.createGain();
    this.osc = audioCtx.createOscillator();
    this.frequency = 440;
    this.isMuted = false;
    this.isPlaying = false;
    this.volume = defaultVolume;
    this.waveForm = waveForm || "sine";

    this.#init();
  }

  #init(): void {
    this.amp.connect(this.context.destination, this.context.currentTime);
    this.amp.gain.setValueAtTime(defaultVolume, this.context.currentTime);

    this.osc.type = this.waveForm;
    this.osc.frequency.setValueAtTime(this.frequency, this.context.currentTime);
    this.osc.connect(this.amp, this.context.currentTime);
  }

  setOscWaveForm(waveForm: OscillatorType): void {
    this.waveForm = waveForm;
    this.osc.type = this.waveForm;
  }

  setOscFrequency(frequency: number): void {
    this.frequency = frequency;
    this.osc.frequency.setValueAtTime(this.frequency, this.context.currentTime);
  }

  setAmpGain(gain: number): void {
    this.volume = gain;
    this.amp.gain.setValueAtTime(this.volume, this.context.currentTime);
  }

  togglePlay() {
    if (this.isPlaying == false) {
      this.#play();
    } else {
      this.#kill();
    }
  }

  #play(): PlayingResponse {
    this.osc.start();
    this.isPlaying = true;
    return { playing: this.isPlaying }
  }

  #kill(): PlayingResponse {
    // Stop oscillator
    this.isPlaying = false;
    this.osc.stop();

    // Disconnect osc & amp
    this.osc.disconnect();

    // Create new osc & amp
    this.osc = this.context.createOscillator();
    this.osc.connect(this.amp, this.context.currentTime);
    this.osc.type = this.waveForm;
    this.osc.frequency.setValueAtTime(this.frequency, this.context.currentTime);

    // return done
    return { playing: this.isPlaying }
  }

  mute(): MutedResposne {
    this.amp.disconnect();
    this.isMuted = true;
    return { muted: this.isMuted }
  }

  unMute(): MutedResposne {
    this.amp.connect(this.context.destination, this.context.currentTime);
    this.isMuted = false;
    return { muted: this.isMuted }
  }
}

type PlayingResponse = { playing: boolean };
type MutedResposne = { muted: boolean };
