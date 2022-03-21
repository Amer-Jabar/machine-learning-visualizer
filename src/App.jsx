import { useEffect, useState } from 'react';

import Spinner, { CLOSING_INTERVAL } from './components/partials/spinner/spinner';
import Visualizer from './components/visualizer/visualizer';

import './App.css';

const App = () => {

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoader(false), CLOSING_INTERVAL);
  }, [])

  return (
    <div className="App">
      {
        loader 
        ? <Spinner></Spinner>
        : <Visualizer></Visualizer>
      }
    </div>
  );
}

export default App;
