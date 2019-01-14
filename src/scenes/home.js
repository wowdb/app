import React, { Component } from 'react'
import { Image, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native'

import { wowdb } from '../assets'
import { Button, Main, NavBar, TextBox } from '../components'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

export default class Home extends Component {
  static navigationOptions = {
    header: <NavBar help />
  }

  componentDidMount() {
    analytics.screen('Home')
  }

  state = {}

  help = () => {
    const {
      navigation: { navigate }
    } = this.props

    navigate('Help')
  }

  search = () => {
    const {
      navigation: { navigate }
    } = this.props
    const { query } = this.state

    if (query) {
      Keyboard.dismiss()

      navigate('Results', {
        query
      })
    }
  }

  render() {
    const { query } = this.state

    return (
      <Main style={styles.main}>
        <View style={styles.header}>
          <Image style={styles.wowdb} source={wowdb} />
        </View>
        <SafeAreaView style={styles.footer}>
          <TextBox
            style={styles.textbox}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={query => this.setState({ query })}
            onSubmitEditing={this.search}
            placeholder="Gul'dan"
            returnKeyType="search"
            value={query}
          />
          <Button label="Search" onPress={this.search} />
        </SafeAreaView>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.margin * 2
  },
  wowdb: {
    height: 100,
    width: 100
  },
  footer: {
    margin: Layout.margin
  },
  textbox: {
    marginBottom: Layout.margin
  }
})
