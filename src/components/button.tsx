import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'

import { colors, fonts, fontWeights, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  label: string
  style?: any

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({ label, style, onPress }) => (
  <Touchable style={[styles.main, style]} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  label: {
    ...fonts.body,
    ...fontWeights.semibold,
    color: colors.black,
    margin: layout.margin
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: layout.border.radius
  }
})
