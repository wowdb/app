import { combineReducers } from 'redux'

import comments from './comments'
import faq from './faq'
import results from './results'

export default combineReducers({
  comments,
  faq,
  results
})
