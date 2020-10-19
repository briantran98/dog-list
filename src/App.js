import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDogs } from './features/dog/dogSlice'

import { Table } from './components/Table'
import { Button } from './components/Button'

import './App.css';

function App() {

  const dogStatus = useSelector(state => state.dogs.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (dogStatus === 'idle') {
      dispatch(fetchDogs())
    }
  },[dogStatus, dispatch])

  return (
    <div className="App">
      <main className="TableContainer">
        <Table tableNumber="1"/>
        <Table tableNumber="2"/>
        <Button />
      </main>
    </div>
  );
}

export default App;
