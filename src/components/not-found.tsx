import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../styles'

export const NotFound: FunctionComponent = () => (
  <View style={styles.main}>
    <Text style={styles.label}>Nothing found</Text>
  </View>
)

const styles = StyleSheet.create({
  label: {
    ...fonts.body
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  }
})
