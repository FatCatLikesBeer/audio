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
  const [alpha, setAlpha] = useState<number | null>(0);
  const [beta, setBeta] = useState<number | null>(0);
  const [gamma, setGamma] = useState<number | null>(0);
  const [noisePlaying, setNoisePlaying] = useState<boolean>(false);
  function handleMotion(event: DeviceOrientationEvent) {
    setAlpha(event.alpha || 0);
    setBeta(event.beta || 0);
    setGamma(event.gamma || 0);
    // Controll square pitch via beta
    oscillator.device.setOscSquFreq(betaToPitch(event.beta || 0));
    // Control sine pitch via gamma
    oscillator.device.setOscSinFreq(gammaToPitch(event.gamma || 0));
  }

  function requestPermission() {
    (DeviceOrientationEvent as any).requestPermission();
  }

  function handleMute() {
    setNoisePlaying(oscillator.toggle());
  }

  useEffect(() => {
    window.addEventListener("deviceorientation", handleMotion);
    return (() => {
      window.removeEventListener("deviceorientation", handleMotion);
    })
  }, []);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { oscillator.device.toggleAmpSqu() }} style={{ margin: 5 }}>Toggle Mute Squ Wave</button>
        <button onClick={() => { oscillator.device.toggleAmpSin() }} style={{ margin: 5 }}>Toggle Mute Sin Wave</button>
      </div>
      <button onClick={handleMute}>
        {noisePlaying ? "Quite Please" : "Make Noise"}
      </button>
      <div>
        <p>alpha: {alpha?.toFixed(2)}</p>
        <p>Square: {beta?.toFixed(2)}</p>
        <p>Sine: {gamma?.toFixed(2)}</p>
      </div>
      <button onClick={requestPermission}>
        access device orientation
      </button>
    </>
  );
}

function gammaToPitch(gamma: number): number {
  return (((gamma + 91) * 6.66) + 200);
}

function betaToPitch(beta: number): number {
  return Math.abs(beta) * 6.66 + 200;
}

export default Slider;
