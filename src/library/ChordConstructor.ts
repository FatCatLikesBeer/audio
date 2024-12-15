import keyJumper from "./keyJumper";

export default class ChordConstructor {
  context: AudioContext;
  amp: GainNode;
  rootkey: OscillatorNode;
  thirdKey: OscillatorNode;
  fifthKey: OscillatorNode;
  volume: number;
  oscillatorsStarted: boolean;

  constructor(context: AudioContext, rootKey: number, scale: ChordScale = "major") {
    const thirdKeySemitoneJump = scale === "major" ? 4 : 3;
    this.context = context;
    this.amp = context.createGain();
    this.rootkey = this.#createAndRouteOscillator(rootKey);
    this.thirdKey = this.#createAndRouteOscillator(keyJumper(rootKey, thirdKeySemitoneJump));
    this.fifthKey = this.#createAndRouteOscillator(keyJumper(rootKey, 7));
    this.volume = 0;
    this.oscillatorsStarted = false;
    this.amp.gain.value = this.volume;
    this.amp.connect(this.context.destination);
  }

  #createAndRouteOscillator(keyValue: number) {
    const newOscillator = this.context.createOscillator();
    newOscillator.type = "sine";
    newOscillator.frequency.value = keyValue;
    newOscillator.connect(this.amp);
    return newOscillator;
  }

  attack(volume: number = 0.08) {
    if (this.oscillatorsStarted == false) { this.#oscillatorInit(); }
    this.amp.gain.setValueAtTime(volume, this.context.currentTime);
  }

  release() {
    this.amp.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.3);
  }

  #oscillatorInit() {
    this.rootkey.start();
    this.thirdKey.start();
    this.fifthKey.start();
    this.oscillatorsStarted = true;
  }
}

type ChordScale = "major" | "minor";
