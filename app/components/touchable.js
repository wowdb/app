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
      const background =
        Platform.Version > 21
          ? TouchableNativeFeedback.SelectableBackgroundBorderless()
          : TouchableNativeFeedback.SelectableBackground()

      return (
        <TouchableNativeFeedback onPress={onPress} background={background}>
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
