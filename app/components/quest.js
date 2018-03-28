import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { Colors, Layout } from '../styles'

export default class Quest extends Component {
  render() {
    const { title, onPress } = this.props

    return (
      <Touchable style={styles.main} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    padding: Layout.margin
  },
  title: {
    color: Colors.text
  }
})
