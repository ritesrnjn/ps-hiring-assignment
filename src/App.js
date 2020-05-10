import React from 'react';
import './App.css';

import News from './News/News'
import Chart from "./Chart";

function App() {
  return (
    <div className="root">
      <News/>
      <Chart/>
    </div>
  );
}

export default App;
