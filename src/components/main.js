import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Main extends Component {
  render() {
    const { children, scroll, style } = this.props

    if (scroll) {
      return (
        <ScrollView style={[styles.main, style]} contentContainerStyle={style}>
          {children}
        </ScrollView>
      )
    }

    return <View style={[styles.main, style]}>{children}</View>
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primaryDark,
    flex: 1
  }
})
