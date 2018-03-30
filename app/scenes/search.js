import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { bigglesworth } from '../assets'
import { Button, Main, TextBox } from '../components'
import { Layout } from '../styles'

class Search extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    query: ''
  }

  search = () => {
    const { query } = this.state

    if (query) {
      const { navigation: { navigate } } = this.props

      navigate('results', {
        query
      })
    }
  }

  render() {
    const { query } = this.state

    return (
      <Main>
        <Main style={styles.main}>
          <Image style={styles.bigglesworth} source={bigglesworth} />
        </Main>
        <View style={styles.search}>
          <TextBox
            style={styles.textbox}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Gul'dan"
            onChangeText={query => this.setState({ query })}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.margin
  },
  bigglesworth: {
    height: 100,
    width: 75
  },
  search: {
    padding: Layout.margin
  },
  textbox: {
    marginBottom: Layout.margin
  }
})

export default connect()(Search)
