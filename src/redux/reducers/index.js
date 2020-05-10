import { combineReducers } from 'redux'
import article from './articleReducer'

const appReducer = combineReducers({
  article
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
