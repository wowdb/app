import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { border } from '../assets'
import { Colors, Layout } from '../styles'

export default class Achievement extends Component {
  render() {
    const { title, icon, onPress } = this.props

    const image = {
      uri: `https://render-eu.worldofwarcraft.com/icons/56/${icon}.jpg`
    }

    return (
      <Touchable style={styles.main} onPress={onPress}>
        <View style={styles.image}>
          <Image source={image} style={styles.icon} />
          <Image source={border} style={styles.border} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  border: {
    height: 68,
    width: 68
  },
  icon: {
    height: 56,
    left: 6,
    position: 'absolute',
    top: 6,
    width: 56
  },
  title: {
    color: Colors.text,
    flex: 1,
    marginLeft: Layout.margin
  }
})
