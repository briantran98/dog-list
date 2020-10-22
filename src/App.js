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

  let content

  if (dogStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } 
  else if (dogStatus === 'completed') {
    content = (
    <React.Fragment>
      <main className="TableContainer">
        <Table tableNumber="1"/>
        <Table tableNumber="2"/>
      </main>
      <Button>Save</Button>
    </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1 className="Title">Rank Your Favorite Dog Breeds!</h1>
      {content}
    </div>
  );
}

export default App;
