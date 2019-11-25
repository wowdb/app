import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors } from '../styles'

interface Props {
  full?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ full }) => {
  if (full) {
    return (
      <View style={styles.main}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    )
  }

  return <ActivityIndicator color={colors.accent} />
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  }
})
