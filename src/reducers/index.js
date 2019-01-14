import { combineReducers } from 'redux'

import meta from './meta'
import objects from './objects'
import results from './results'

export default combineReducers({
  meta,
  objects,
  results
})
