import React, { useEffect } from 'react';
import { Table } from './components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDogs } from './features/dog/dogSlice'
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
      <Table tableNumber="1"/>
      <Table tableNumber="2"/>
      {/* <div className="droppable" onDragOver={(e)=>this.onDragOver(e)} ></div> */}
    </div>
  );
}

export default App;
