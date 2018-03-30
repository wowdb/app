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
      clearButtonMode,
      onChangeText,
      onSubmitEditing,
      placeholder,
      returnKeyType,
      style,
      value
    } = this.props
    const { focused } = this.state

    return (
      <View style={[styles.main, focused && styles.focused, style]}>
        <TextInput
          style={styles.input}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          clearButtonMode={clearButtonMode}
          onBlur={this.onBlur}
          onChangeText={onChangeText}
          onFocus={this.onFocus}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor={Colors.textDark}
          returnKeyType={returnKeyType}
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
  focused: {
    ...Colors.shadow
  },
  input: {
    color: Colors.text,
    height: Layout.textboxHeight,
    paddingHorizontal: Layout.margin
  }
})
