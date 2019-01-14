import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['foo']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)))

const persistor = persistStore(store)

export { store, persistor }
