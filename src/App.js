import METROGNOME from './METROGNOME.PNG'
import './App.css';
import Metronome from './components/Metronome/Metronome'

function App() {
  return (
    <div className="App">
      <img alt="fashionable gnome" src={METROGNOME} />
     <Metronome />
    </div>
  );
}

export default App;
