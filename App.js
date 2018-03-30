import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from './app/index'
import store from './app/store'

import { segment, sentry } from './app/lib'

export default class Bigglesworth extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
