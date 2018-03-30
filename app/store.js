import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = [thunk]

if (__DEV__) {
  middleware.push(logger)
}

const enhancer = compose(applyMiddleware(...middleware))

export default createStore(reducers, enhancer)
