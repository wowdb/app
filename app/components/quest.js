import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { Colors, Layout } from '../styles'

export default class Quest extends Component {
  render() {
    const { title, reqLevel, onPress } = this.props

    return (
      <Touchable style={styles.main} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.level}>{reqLevel}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: Layout.margin
  },
  title: {
    color: Colors.text,
    flex: 1,
    marginRight: Layout.margin
  },
  level: {
    color: Colors.textDark
  }
})
