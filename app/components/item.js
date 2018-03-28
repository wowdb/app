import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { border } from '../assets'
import { Colors, Layout } from '../styles'

export default class Item extends Component {
  render() {
    const { name, icon, quality, itemLevel, onPress } = this.props

    const image = {
      uri: `https://render-eu.worldofwarcraft.com/icons/56/${icon}.jpg`
    }

    const color = {
      color: Colors.items[quality]
    }

    return (
      <Touchable style={styles.main} onPress={onPress}>
        <View style={styles.image}>
          <Image source={image} style={styles.icon} />
          <Image source={border} style={styles.border} />
        </View>
        <Text style={[styles.name, color]}>{name}</Text>
        <Text style={styles.level}>{itemLevel}</Text>
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
  name: {
    flex: 1,
    marginHorizontal: Layout.margin
  },
  level: {
    color: Colors.textDark
  }
})
