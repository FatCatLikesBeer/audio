import { useEffect, useState } from 'react';
import Osc from '../library/oscillator';

const audioCtx = new AudioContext();

const oscillator = {
  device: new Osc(audioCtx),
  playStarted: false,
  toggle: function() {
    if (this.playStarted === false) {
      this.playStarted = true;
      this.device.play();
      return this.playStarted;
    } else {
      return !this.device.toggleMute();
    }
  },
}

function Slider() {
  const [alpha, setAlpha] = useState<number>(0);
  const [beta, setBeta] = useState<number>(0);
  const [gamma, setGamma] = useState<number>(0);
  const [noisePlaying, setNoisePlaying] = useState<boolean>(false);

  function handleOrientation(event: DeviceOrientationEvent) {
    setAlpha(event.alpha || 0);
    setBeta(event.beta || 0);
    setGamma(event.gamma || 0);
    // Controll square pitch via beta
    oscillator.device.setOscSquFreq(betaToPitch(event.beta || 0));
    // Control sine pitch via gamma
    oscillator.device.setOscSinFreq(gammaToPitch(event.gamma || 0));
  }

  function handleMute() {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    setNoisePlaying(oscillator.toggle());
    (DeviceOrientationEvent as any).requestPermission();
  }

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation);
    return (() => {
      window.removeEventListener("deviceorientation", handleOrientation);
    });
  }, []);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => { oscillator.device.toggleAmpSqu() }}
          style={{
            margin: 5,
            color: `rgb(${betaToRGB(alpha)}, ${betaToRGB(beta)}, ${gammaToRGB(gamma)})`,
          }}
        >Toggle Mute Squ Wave</button>
        <button
          onClick={() => { oscillator.device.toggleAmpSin() }}
          style={{
            margin: 5,
            color: `rgb(${betaToRGB(beta)}, ${betaToRGB(alpha)}, ${gammaToRGB(gamma)})`,
          }}
        >Toggle Mute Sin Wave</button>
      </div>
      <button
        style={{
          margin: 36,
          color: `rgb(${gammaToRGB(gamma)}, ${betaToRGB(alpha)}, ${betaToRGB(beta)})`,
          backgroundColor: noisePlaying ? `rgb(${gammaToRGB(gamma)}, ${betaToRGB(beta)}, ${betaToRGB(alpha)})` : "",
        }}
        onClick={handleMute}
      > <span style={{ fontSize: 50 }}>{noisePlaying ? "DEAR GOD STOP" : "Make Noise 🎉📯🎹"}</span>
      </button>
      <div>
      </div>
    </>
  );
}

// Gamma range -90 to 90
function gammaToPitch(gamma: number): number {
  return (((gamma + 91) * 6.66) + 200);
}

// Beta range -180 to 180
function betaToPitch(beta: number): number {
  return Math.abs(beta) * 6.66 + 200;
}

function gammaToRGB(gamma: number): number {
  return Math.floor((gamma + 91) * 1.4);
}

// Also works with alpha
function betaToRGB(beta: number): number {
  return Math.floor((beta + 181) * 0.7);
}

export default Slider;
