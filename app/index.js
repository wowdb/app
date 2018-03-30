import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { Search, Results, Details } from './scenes'
import { Colors } from './styles'

export const Navigator = StackNavigator({
  search: Search,
  results: Results,
  details: Details
})

export default class Bigglesworth extends Component {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar backgroundColor={Colors.accent} barStyle="light-content" />
        <KeyboardAvoidingView style={styles.main} behavior="padding">
          <Navigator />
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    flex: 1
  }
})
