import React, { Component } from 'react'
import { Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { bigglesworth, help } from '../assets'
import { Button, Main, TextBox, Touchable } from '../components'
import { segment } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

class Search extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    query: ''
  }

  componentDidMount() {
    segment.screen('search')
  }

  help = () => {
    const {
      navigation: { navigate }
    } = this.props

    navigate('help')
  }

  search = () => {
    const { query } = this.state

    if (query) {
      const {
        navigation: { navigate }
      } = this.props

      navigate('results', {
        query
      })

      Keyboard.dismiss()
    }
  }

  render() {
    const { query } = this.state

    return (
      <Main style={styles.main}>
        <Touchable style={styles.help} onPress={this.help}>
          <Image style={styles.icon} source={help} />
        </Touchable>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.bigglesworth} source={bigglesworth} />
          </View>
          <Text style={styles.about}>
            <Text style={styles.name}>Mr Bigglesworth</Text>
            <Text> helps you find </Text>
            <Text style={styles.wow}>World of Warcraft</Text>
            <Text> data on the go</Text>
          </Text>
        </View>
        <View style={styles.footer}>
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
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary
  },
  help: {
    alignSelf: 'flex-end'
  },
  icon: {
    height: 32,
    margin: Layout.margin,
    opacity: 0.25,
    width: 32
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '20%'
  },
  logo: {
    ...Colors.shadow
  },
  bigglesworth: {
    height: 100,
    width: 100
  },
  about: {
    color: Colors.textDark,
    fontSize: Fonts.size.subtitle,
    marginTop: Layout.margin * 2,
    textAlign: 'center'
  },
  name: {
    color: Colors.accent,
    lineHeight: Fonts.size.subtitle * 1.4
  },
  wow: {
    color: Colors.text
  },
  footer: {
    padding: Layout.margin
  },
  textbox: {
    marginBottom: Layout.margin
  }
})

export default connect()(Search)
