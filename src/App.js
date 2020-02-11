import React from 'react';
import './App.css';
import Square from './Square';
import ControlButtons from './ControlButtons';
import Dimensions from './Dimensions';
import WaitPanel from './WaitPanel';

function App() {
  return (
	  <>
	  	<WaitPanel />
	  	<Square />
	  	<ControlButtons delayMs={1250} />
	  	<Dimensions debounceMs={250} />
	  </>
  );
}

export default App;
