import { CODE_PUSH_KEY_ANDROID, CODE_PUSH_KEY_IOS } from 'react-native-dotenv'

import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import codePush from 'react-native-code-push'

import { getMeta } from './actions'
import {
  Achievement,
  Boss,
  Help,
  Home,
  Item,
  Mount,
  Pet,
  Quest,
  Results,
  Spell,
  Zone
} from './scenes'

const Navigator = createStackNavigator(
  {
    Achievement,
    Boss,
    Help,
    Home,
    Item,
    Mount,
    Pet,
    Quest,
    Results,
    Spell,
    Zone
  },
  {
    initialRouteName: 'Home'
  }
)

const Container = createAppContainer(Navigator)

class WoWdb extends Component {
  componentDidMount() {
    const { getMeta } = this.props

    getMeta()
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior="padding">
        <Container />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

const mapDispatchToProps = dispatch => ({
  getMeta: () => dispatch(getMeta())
})

const options = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  deploymentKey: Platform.select({
    android: CODE_PUSH_KEY_ANDROID,
    ios: CODE_PUSH_KEY_IOS
  })
}

export default codePush(options)(
  connect(
    null,
    mapDispatchToProps
  )(WoWdb)
)
