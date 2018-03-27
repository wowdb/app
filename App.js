import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Mr Bigglesworth</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})
