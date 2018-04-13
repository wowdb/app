import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import { Search, Help, Results, Details } from './scenes'
import { Colors } from './styles'

export const Navigator = StackNavigator(
  {
    search: Search,
    help: Help,
    results: Results,
    details: Details
  },
  {
    cardStyle: {
      shadowColor: 'transparent'
    }
  }
)

export default class Bigglesworth extends Component {
  render() {
    if (Platform.OS === 'android') {
      return <Navigator />
    }

    return (
      <SafeAreaView style={styles.main}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView style={styles.main} behavior="padding">
          <Navigator />
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary,
    flex: 1
  }
})
