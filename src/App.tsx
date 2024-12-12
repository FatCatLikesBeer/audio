import './App.css'

import Slider from './components/Slider';

function App() {

  return (
    <>
      <div>
        <p style={{ fontSize: "2em" }}> Billy's Noise Maker </p>
        <Slider />
        <div style={{ marginTop: 48 }}>
          <p style={{ margin: 8, fontSize: 12 }}>Made by billlaaayyy</p>
          <p style={{ margin: 8, fontSize: 12 }}><a href="https://billlaaayyy.bsky.social" target='_blank'>bsky</a> --- <a href="https://github.com/FatCatLikesBeer/audio" target='_blank'>github</a></p>
        </div>
      </div>
    </>
  )
}

export default App
