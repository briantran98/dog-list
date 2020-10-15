import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  axios.get("https://dog.ceo/api/breeds/list/all")
    .then(res => {
      console.log(Object.keys(res.data.message))
    })

  return (
    <div className="App">
    </div>
  );
}

export default App;
