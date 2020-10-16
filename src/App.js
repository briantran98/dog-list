import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { fetchDogs } from './features/dog/dogSlice'
import './App.css';

function App() {
  const dispatch = useDispatch()
  const dogStatus = useSelector(state => state.dogs.status)


  useEffect(() => {
    if (dogStatus === 'idle') {
      dispatch(fetchDogs())
    }
  },[dogStatus, dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
