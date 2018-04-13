import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import App from './app/index'
import store from './app/store'

import { segment, sentry } from './app/lib'

class Bigglesworth extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Bigglesworth', () => Bigglesworth)
