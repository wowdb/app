import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Separator extends Component {
  render() {
    return <View style={styles.main} />
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.border,
    height: StyleSheet.hairlineWidth
  }
})
