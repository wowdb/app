import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { Colors, Layout } from '../styles'

export default class TextBox extends Component {
  state = {
    focused: false
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  render() {
    const {
      autoCapitalize,
      autoCorrect,
      placeholder,
      style,
      value,
      onChangeText
    } = this.props
    const { focused } = this.state

    return (
      <View style={[styles.main, focused && styles.focused, style]}>
        <TextInput
          style={styles.input}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onBlur={this.onBlur}
          onChangeText={onChangeText}
          onFocus={this.onFocus}
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
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    borderWidth: 1
  },
  focused: {
    borderColor: Colors.primary
  },
  input: {
    color: Colors.text,
    height: Layout.textboxHeight - 2,
    paddingHorizontal: Layout.margin
  }
})
