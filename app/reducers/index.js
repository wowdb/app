import { combineReducers } from 'redux'

import comments from './comments'
import results from './results'

export default combineReducers({
  comments,
  results
})
