import * as Sentry from '@sentry/react-native'
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { SENTRY_DSN } from 'react-native-dotenv'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './src/index'
import { persistor, store } from './src/store'

Sentry.init({
  dsn: SENTRY_DSN
})

class WoWdb extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('WoWdb', () => WoWdb)
