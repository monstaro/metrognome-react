import React, { useState, Component } from 'react';
import './Metronome.css';


class Metronome extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {
          audioContext: null,
          notesInQueue: [],         // notes that have been put into the web audio and may or may not have been played yet {note, time}
          currentQuarterNote: 0,
          tempo: 120,
          lookahead: 25,          // How frequently to call scheduling function (in milliseconds)
          scheduleAheadTime: 0.1,   // How far ahead to schedule audio (sec)
          nextNoteTime: 0.0,    // when the next note is due
          isRunning: false,
          intervalID: null
    }
  }
    nextNote = () =>
    {
        // Advance current note and time by a quarter note (crotchet if you're posh)
        var secondsPerBeat = 60.0 / this.state.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
        this.setState({
          nextNoteTime: this.state.nextNoteTime + secondsPerBeat,
          currentQuarterNote: this.state.currentQuarterNote+1,
        })
        if (this.state.currentQuarterNote === 4) {
          this.setState({
            currentQuarterNote: 0
          })
        }
    }

    scheduleNote = (beatNumber, time) =>
    {
        // push the note on the queue, even if we're not playing.
        this.setState({
          notesInQueue: ([...this.state.notesInQueue, { note: beatNumber, time: time }])
        })
        // create an oscillator
        const osc = this.state.audioContext.createOscillator();
        const envelope = this.state.audioContext.createGain();
        
        osc.frequency.value = (beatNumber % 4 === 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.state.audioContext.destination);
    
        osc.start(time);
        osc.stop(time + 0.03);
    }

    scheduler = () =>
    {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.state.nextNoteTime < this.state.audioContext.currentTime + this.state.scheduleAheadTime ) {
            this.scheduleNote(this.state.currentQuarterNote, this.state.nextNoteTime);
            this.nextNote();
        }
    }

    start = () => 
    {
        if (this.state.isRunning) return;

        if (this.state.audioContext === null)
        {
            this.setState({
              audioContext: new (window.AudioContext || window.webkitAudioContext)()
            })
        }
        this.setState({
          isRunning: true,
          tcurrentQuarterNote: 0,
          nextNoteTime: 0 + 0.05,
          intervalID: setInterval(() => this.scheduler(), this.state.lookahead)
        })
    }

    stop = () =>
    {
        this.isRunning = false;

        clearInterval(this.state.intervalID);
    }

    startStop = () =>
    {
        if (this.state.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
render() {
  return (
          <div className="metronome">
            {this.state.tempo}
            <input
              type="range"
              min="60"
              max="240"
              value={this.state.tempo}
              onChange={(e) => this.setState({
                tempo: e.target.value
              })}
            />
            <button onClick={() => this.startStop()}>
              {this.state.isRunning ? 'Stop' : 'Start'}
            </button>
            Metronome Component
          </div>
        )
}
}

export default Metronome;

// const Metronome = () => {
//   const [bpm, setBpm] = useState(120);
//   const [playing, setPlaying] = useState(false);
//   const [count, setCount] = useState(0);
//   const [beatsInQueue, setBeats] = useState([]);
//   const [nextNoteTime, setNextTime] = useState(0.0);
//   const [audioContext, setAudioContext] = useState(null);
//   const [intervalID, setIntervalID] = useState(null);
  
//   const nextNote = () => {
//     let secondsPerBeat = 60 / bpm;
//     setNextTime(secondsPerBeat);
//     setCount(count+1);
//     count === 4 && setCount(0);
//   }

//   const scheduleNote = (beatNumber, time) => {
//     setBeats([...beatsInQueue, {note: beatNumber, time: time}])

//     const osc = audioContext.createOscillator();
//     const envelope = audioContext.createGain();
        
//     osc.frequency.value = (beatNumber % 4 === 0) ? 1000 : 800;
//     envelope.gain.value = 1;
//     envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
//     envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

//     osc.connect(envelope);
//     envelope.connect(audioContext.destination);
    
//     osc.start(time);
//     osc.stop(time + 0.03);
// }

// const scheduler = () => {
//     // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
//     while (nextNoteTime < AudioContext.currentTime + 0.1 ) {
//         scheduleNote(count, nextNoteTime);

//         // Advance current note and time by a quarter note (crotchet if you're posh)
//         setNextTime(60.0 / bpm); // Add beat length to last beat time
//         setCount(count+1);    // Advance the beat number, wrap to zero
//         if (count === 4) {
//             setCount(0);
//             nextNote();
//         }
//     }
// }

// const start = () =>
// {
//     if (playing) return;

//     if (audioContext === null)
//     {
//       console.log('k')
//         setAudioContext(new(window.AudioContext || window.webkitAudioContext)());
//         console.log(audioContext, AudioContext)
//     }

//     setPlaying(true);
//     setBeats(0);
//     setNextTime(AudioContext.currentTime + 0.05);
//     setIntervalID(setInterval(() => scheduler(), 25))
// }

// const stop = () =>
// {
//     setPlaying(false)
//     setInterval(intervalID);
// }

// const startStop = () => {
//     if (playing) {
//         stop();
//     }
//     else {
//         start();
//     }
// }
//     return (
//       <div className="metronome">
//         {bpm}
//         <input
//           type="range"
//           min="60"
//           max="240"
//           value={bpm}
//           onChange={(e) => setBpm(e.target.value)}
//         />
//         <button onClick={() => startStop()}>
//           {playing ? 'Stop' : 'Start'}
//         </button>
//         Metronome Component
//       </div>
//     )
// }


// export default Metronome;