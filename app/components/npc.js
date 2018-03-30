import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { Colors, Layout } from '../styles'

export default class NPC extends Component {
  render() {
    const { name, onPress } = this.props

    return (
      <Touchable style={styles.main} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: Layout.margin
  },
  name: {
    color: Colors.text,
    flex: 1
  }
})
