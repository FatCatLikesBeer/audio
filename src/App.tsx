import { useState } from 'react';
import './App.css'

import Slider from './components/Slider';
import Sequencer from './components/Sequencer';

function App() {
  const [showingNoiseMaker, setShowingNoiseMaker] = useState(true);

  function handleToggle() {
    setShowingNoiseMaker(!showingNoiseMaker);
  }

  return (
    <>
      <div>
        <p style={{ fontSize: "36px", marginBottom: 8 }}> <span onClick={handleToggle}>Billy's Sound Lab</span></p>
        <p style={{ marginBottom: 16 }} >
          <a onClick={handleToggle}>
            <span style={{
              color: showingNoiseMaker ? "black" : "",
              backgroundColor: showingNoiseMaker ? "white" : "",
            }}>Noise</span>
            {' '}---{' '}
            <span style={{
              color: !showingNoiseMaker ? "black" : "",
              backgroundColor: !showingNoiseMaker ? "white" : "",
            }}>Chords</span></a></p>
        {showingNoiseMaker ? <Slider /> : <Sequencer />}
        <div style={{ marginTop: 48 }}>
          <p style={{ margin: 8, fontSize: 12 }}>Made by billlaaayyy</p>
          <p style={{ margin: 8, fontSize: 12 }}><a href="https://billlaaayyy.bsky.social" target='_blank'>bsky</a> --- <a href="https://github.com/FatCatLikesBeer/audio" target='_blank'>github</a></p>
        </div>
      </div>
    </>
  )
}

export default App
