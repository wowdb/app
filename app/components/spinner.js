import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'

import { Colors } from '../styles'

export default class Spinner extends Component {
  render() {
    const { size = 'small' } = this.props

    return <ActivityIndicator color={Colors.accent} size={size} />
  }
}
