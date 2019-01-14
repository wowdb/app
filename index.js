import { SENTRY_DSN } from 'react-native-dotenv'

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Sentry } from 'react-native-sentry'
import { PersistGate } from 'redux-persist/integration/react'

import App from './src/index'
import { persistor, store } from './src/store'

Sentry.config(SENTRY_DSN).install()

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
