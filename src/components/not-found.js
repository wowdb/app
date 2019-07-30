import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { nothing_found } from '../assets'
import { Layout } from '../styles'
import Text from './text'

export default class NotFound extends Component {
  render() {
    const { style } = this.props

    return (
      <View style={[styles.main, style]}>
        <Image style={styles.icon} source={nothing_found} />
        <Text style={styles.message}>Nothing found</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    height: 50,
    width: 50
  },
  message: {
    marginLeft: Layout.margin
  }
})
