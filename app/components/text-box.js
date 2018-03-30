import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { Colors, Layout } from '../styles'

export default class TextBox extends Component {
  render() {
    const {
      autoCapitalize,
      autoCorrect,
      placeholder,
      style,
      value,
      onChangeText
    } = this.props

    return (
      <View style={[styles.main, style]}>
        <TextInput
          style={styles.input}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textDark}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: Layout.borderRadius
  },
  input: {
    color: Colors.text,
    height: Layout.textboxHeight,
    paddingHorizontal: Layout.margin
  }
})
