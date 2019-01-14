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
      const {
        SelectableBackground,
        SelectableBackgroundBorderless
      } = TouchableNativeFeedback

      const background =
        Platform.Version > 21
          ? SelectableBackgroundBorderless()
          : SelectableBackground()

      return (
        <TouchableNativeFeedback background={background} onPress={onPress}>
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
