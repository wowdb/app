import React, { FunctionComponent } from 'react'
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native'

import { colors, fonts, layout } from '../styles'

interface Props {
  style?: ViewStyle
}

export const TextBox: FunctionComponent<Props & TextInputProps> = ({
  autoCapitalize,
  autoCorrect,
  onChangeText,
  onSubmitEditing,
  placeholder,
  returnKeyType,
  style,
  value
}) => (
  <TextInput
    style={[styles.main, style]}
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    placeholder={placeholder}
    placeholderTextColor={colors.gray}
    returnKeyType={returnKeyType}
    value={value}
  />
)

const styles = StyleSheet.create({
  main: {
    ...fonts.body,
    backgroundColor: colors.black,
    borderRadius: layout.border.radius,
    padding: layout.margin
  }
})
