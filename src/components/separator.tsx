import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '../styles'

export const Separator: FunctionComponent = () => <View style={styles.main} />

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.border,
    height: 1
  }
})
