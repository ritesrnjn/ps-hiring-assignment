import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'

function App(props) {
  return (
    <Switch>
      <Route path="/" render={props => <Home {...props} />} />
    </Switch>
  )
}

export default App
