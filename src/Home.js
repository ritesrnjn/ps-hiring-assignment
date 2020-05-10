import React from 'react'
import './App.css'

import News from './News'
import Chart from './Chart'

function Home(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <News history={props.history} />
          <Chart />
        </div>
      </div>
    </div>
  )
}

export default Home
