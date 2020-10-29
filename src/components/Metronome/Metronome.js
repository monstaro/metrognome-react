import React, { useState } from 'react';
import './Metronome.css';

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(true);
  // const [count, setCount] = 0;
  // const [beatsPerMeasure, setBeatsPerMeasure] = 4;
    return (
      <div className="metronome">
        {bpm}
        <input
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
        />
        <button>
          {playing ? 'Stop' : 'Start'}
        </button>
        Metronome Component
      </div>
    )
}


export default Metronome;