import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Main extends Component {
  render() {
    const { children, scroll, style } = this.props

    const MainView = scroll ? ScrollView : View

    return <MainView style={[styles.container, style]}>{children}</MainView>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  }
})
