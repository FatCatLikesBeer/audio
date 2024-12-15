import { useState } from "react";
import ChordConstructor from "../library/ChordConstructor";
import keyJumper from "../library/keyJumper";
import KeyButton from "./KeyButton";
import VolumeContext from "../context/VolumeContext";

const audioCtx = new AudioContext();

const a4 = 440;
const c5 = keyJumper(a4, 3);
const g3 = keyJumper(a4, -13);

const gMajor = new ChordConstructor(audioCtx, g3);
const gMinor = new ChordConstructor(audioCtx, g3, "minor");
const aMajor = new ChordConstructor(audioCtx, a4);
const aMinor = new ChordConstructor(audioCtx, a4, "minor");
const cMajor = new ChordConstructor(audioCtx, c5);
const cMinor = new ChordConstructor(audioCtx, c5, "minor");

export default function Sequencer() {
  const [volume, setVolume] = useState(2);

  function handleVolume(event: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(event.target.value));
  }

  return (
    <VolumeContext.Provider value={volume * 0.1}>
      <div>
        <div style={{ marginBottom: 24, }}>
          Volume: {volume}
          <br />
          <input
            type="range"
            value={volume}
            name="volume"
            min={0}
            max={10}
            step={1}
            onChange={handleVolume}
          />
        </div>
        <div style={{ flex: 1 }}>
          <KeyButton chord={gMajor} label="gMajor" />
          <KeyButton chord={gMinor} label="gMinor" />
        </div>
        <div style={{ flex: 1 }}>
          <KeyButton chord={aMajor} label="aMajor" />
          <KeyButton chord={aMinor} label="aMinor" />
        </div>
        <div style={{ flex: 1 }}>
          <KeyButton chord={cMajor} label="cMajor" />
          <KeyButton chord={cMinor} label="cMinor" />
        </div>
      </div>
    </VolumeContext.Provider>
  )
}
