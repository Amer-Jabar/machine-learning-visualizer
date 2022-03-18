import { useEffect, useState } from 'react';

import Spinner, { CLOSING_INTERVAL } from './components/partials/spinner/spinner';

import './App.css';
import Visualizer from './components/visualizer/visualizer';

const App = () => {

  const [loader, setLoader] = useState(true);
  useEffect(() => setTimeout(() => setLoader(false), CLOSING_INTERVAL), [])

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
