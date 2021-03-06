import React from 'react';
import './Metronome.css';
import on from '../../on.svg';
import off from '../../off.svg';
import plus from '../../plus.svg';
import minus from '../../minus.svg';
import SavedTempos from '../SavedTempos/SavedTempos';

class Metronome extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {
          audioContext: null,
          notesInQueue: [],
          currentQuarterNote: 0,
          tempo: localStorage.getItem('currentTempo') || 120,
          lookahead: 25,    
          scheduleAheadTime: 0.1,   
          nextNoteTime: 0.0,
          isRunning: false,
          intervalID: null,
          message: 'Quit all the malarkey and start practicing!'
    }
  }
    nextNote = () =>
    {
        var secondsPerBeat = 60.0 / this.state.tempo;
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
    componentDidUpdate = () => {
      localStorage.setItem('currentTempo', this.state.tempo);
    }
    scheduleNote = (beatNumber, time) =>
    {
        this.setState({
          notesInQueue: ([...this.state.notesInQueue, { note: beatNumber, time: time }])
        })
        const osc = this.state.audioContext.createOscillator();
        const envelope = this.state.audioContext.createGain();
        osc.frequency.value = (beatNumber % 4 === 0) ? 1300 : 1000;
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
          currentQuarterNote: 0,
          nextNoteTime: 0 + 0.05,
          intervalID: setInterval(() => this.scheduler(), this.state.lookahead)
        })
    }
    stop = () =>
    {
        this.setState({
          isRunning: false
        })
        clearInterval(this.state.intervalID);
    }
    startStop = () =>
    {
      console.log(this.state.tempo)
        if (this.state.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
    tweakTempo = (direction, savedTempo) => {
      if (direction === "minus") {
        this.setState({
          tempo: (parseInt(this.state.tempo) - 1)
        })
      } if (direction === "add") {
        this.setState({
          tempo: (parseInt(this.state.tempo) + 1)
        }) 
      } else if (direction === "custom") {
        this.setState({
          tempo: parseInt(savedTempo)
        })
      }
    }
    saveSongToStorage = (action) => {
      let songName = document.querySelector('#songName').value;
      let songs;
      if(localStorage.getItem('songs') === null) {
        songs = {};
      } else {
        songs = JSON.parse(localStorage.getItem('songs'))
      }
      if (!songs[songName]) {
        songs[songName] = this.state.tempo;
      }
      localStorage.setItem('songs', JSON.stringify(songs));
    }
render() {
  return (
    <div className="metronome-container">
          <div className="metronome">
            <p>{this.state.message}</p>
            <p className="current-bpm"> {this.state.tempo} bpm</p>
            <div className="slider">
            <img className="tempo-change" src={minus} alt="decrease BPM by 1" onClick={() => {
              this.tweakTempo('minus')
            }}/>
            <input
              type="range"
              min="60"
              max="240"
              value={this.state.tempo}
              onChange={(e) => this.setState({
                tempo: e.target.value
              })}
            />
            <img className="tempo-change" src={plus} alt="increase BPM by 1" onClick={() => {
              this.tweakTempo('add')
            }}/>
            </div>
            <button onClick={() => this.startStop()}>
              {this.state.isRunning ? <img className="on-off" src={off} alt="turn off" /> : <img className="on-off" src={on} alt="turn on" />}
            </button>
          <form className="save-tempo-form">
            <label for="song name input">
              <input type="text" id="songName" className="song-name-input" placeholder="Type your song name"></input>
              </label>
              <div class="save-clear-buttons">
            <button className="save-btn" onClick={() => this.saveSongToStorage('save')}>SAVE</button>
            <button className="clr-btn" onClick={() => localStorage.clear()}>CLEAR</button>
            </div>
            </form>
          </div>
          <div className="saved-songs">
            <h2 className="saved-songs-header">Saved Songs</h2>
              {
                localStorage.getItem('songs') &&
                Object.keys(JSON.parse(localStorage.getItem('songs'))).map(song  => <SavedTempos clickHandler={this.tweakTempo} songName={song} currentTempo={this.state.tempo} tempo={JSON.parse(localStorage.getItem('songs'))[song]}/>)
              }
            </div>
          </div>
        )
  }
}
export default Metronome;