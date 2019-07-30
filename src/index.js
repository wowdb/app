import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

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
    if (Platform.OS === 'android') {
      return <Container />
    }

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

export default connect(
  null,
  mapDispatchToProps
)(WoWdb)
