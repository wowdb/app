import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Separator extends Component {
  render() {
    const { style } = this.props

    return <View style={[styles.main, style]} />
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.border,
    height: StyleSheet.hairlineWidth
  }
})
