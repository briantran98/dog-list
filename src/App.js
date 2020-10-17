import React from 'react';
import { Table } from './components/Table'
import './App.css';

function App() {

  return (
    <div className="App">
      <Table tableNumber="1"/>
      <Table tableNumber="2"/>
      {/* <div className="droppable" onDragOver={(e)=>this.onDragOver(e)} ></div> */}
    </div>
  );
}

export default App;
