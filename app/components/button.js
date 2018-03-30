import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { Colors, Fonts, Layout } from '../styles'

export default class Button extends Component {
  render() {
    const { label, loading, style, styleLabel, onPress } = this.props

    if (loading) {
      return (
        <View style={[styles.main, styles.loading, style]}>
          <ActivityIndicator color={Colors.background} />
        </View>
      )
    }

    return (
      <View style={[styles.main, style]}>
        <Touchable style={styles.touchable} onPress={onPress}>
          <Text style={[styles.label, styleLabel]}>{label}</Text>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    ...Colors.shadow,
    backgroundColor: Colors.accent,
    borderRadius: Layout.borderRadius,
    height: Layout.buttonHeight
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchable: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  label: {
    color: Colors.background,
    fontWeight: Fonts.weight.semibold
  }
})
