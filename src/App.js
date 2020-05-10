import React from 'react';
import './App.css';

import News from './News'
import Chart from "./Chart";

function App() {
  return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-12">
      <News/>

      <Chart/>
            </div>
        </div>
        </div>
  );
}

export default App;
