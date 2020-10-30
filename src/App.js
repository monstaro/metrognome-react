import METROGNOME from './METROGNOME.png'
import './App.css';
import Metronome from './components/Metronome/Metronome'
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <img alt="fashionable gnome" src={METROGNOME} /> */}
     <Metronome />
    </div>
  );
}

export default App;
