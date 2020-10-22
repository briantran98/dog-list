import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDogs } from './features/dog/dogSlice'

import { Table } from './components/Table'
import { Button } from './components/Button'
import { NavBar } from './components/NavBar'

import './App.css';

function App() {

  const dogStatus = useSelector(state => state.dogs.status)
  const error = useSelector(state => state.dogs.error)
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
      <main className="table-container">
        <Table tableNumber="1"/>
        <Table tableNumber="2"/>
      </main>
    </React.Fragment>
    )
  }

  return (
    <div className="app">
      <NavBar/>
      <section className="info-container">
        <h1 className="title">Rank Your Favorite Dog Breeds!</h1>
        <p className="description">A Dog breed ranking list to illustrate which dog breeds you like better!</p>
        <Button>Save</Button>
        {error && <span className="error">{error}</span>}
      </section>
      {content}
      <div className="mobile-button">
       <Button>Save</Button>
      </div>
    </div>
  );
}

export default App;
