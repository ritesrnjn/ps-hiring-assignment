/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import api from './middlewares/api'

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = x => x

// process.env.NODE_ENV: development|production
if (
  process.env.NODE_ENV !== 'production' &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

function create(initialState) {
  let middleware = [thunk, api]

  if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    !window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // redux-logger needs this feature
    Object.hasOwnProperty('assign')
  ) {
    // eslint-disable-next-line global-require
    const { createLogger } = require('redux-logger')

    middleware = [...middleware, createLogger()]
  }

  return createStore(
    rootReducer,
    initialState, // Hydrate the store with server-side data
    compose(applyMiddleware(...middleware), devtools)
  )
}

export default function initRedux(initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse store on the client-side
  if (!global.__INIT_REDUX_STORE__) {
    global.__INIT_REDUX_STORE__ = create(initialState)
  }

  return global.__INIT_REDUX_STORE__
}
