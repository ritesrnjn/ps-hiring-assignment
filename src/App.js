import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './Home'

import configureStore from './redux/initRedux'

export const store = configureStore()

function App(props) {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" render={props => <Home {...props} />} />
      </Switch>
    </Provider>
  )
}

export default App
