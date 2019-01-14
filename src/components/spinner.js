import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Spinner extends Component {
  render() {
    const { full, size = 'small' } = this.props

    if (full) {
      return (
        <View style={styles.full}>
          <ActivityIndicator color={Colors.accent} size={size} />
        </View>
      )
    }

    return <ActivityIndicator color={Colors.accent} size={size} />
  }
}

const styles = StyleSheet.create({
  full: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center'
  }
})
