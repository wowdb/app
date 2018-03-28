import React, { Component } from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'

export default class Touchable extends Component {
  render() {
    const { children, onPress, style } = this.props

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View style={style} pointerEvents="box-only">
            {children}
          </View>
        </TouchableNativeFeedback>
      )
    }

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    )
  }
}
