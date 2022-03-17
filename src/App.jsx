import Spinner from './components/partials/spinner/spinner';

import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const CLOSING_INTERVAL = 3000;
  const [loader, setLoader] = useState(false);

  useEffect(() => setTimeout(() => setLoader(false), CLOSING_INTERVAL), [])

  return (
    <div className="App">
      <Spinner
      loader={loader}
      closingInterval={CLOSING_INTERVAL}
      ></Spinner>
    </div>
  );
}

export default App;
