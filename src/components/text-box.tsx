import React, { FunctionComponent } from 'react'
import { StyleSheet, TextInput, ViewStyle } from 'react-native'

import { colors, fonts, layout } from '../styles'

interface Props {
  autoCapitalize?: boolean
  autoCorrect?: boolean
  placeholder: string
  style?: ViewStyle
  value: string

  onChange: (value: string) => void
}

export const TextBox: FunctionComponent<Props> = ({
  autoCapitalize,
  autoCorrect,
  placeholder,
  style,
  value,
  onChange
}) => (
  <TextInput
    style={[styles.main, style]}
    autoCapitalize={autoCapitalize ? 'sentences' : 'none'}
    autoCorrect={autoCorrect}
    onChangeText={value => onChange(value)}
    placeholder={placeholder}
    placeholderTextColor={colors.gray}
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
