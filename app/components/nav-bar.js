import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Touchable } from '.'
import { back } from '../assets'
import { Colors, Fonts, Layout } from '../styles'

export default class NavBar extends Component {
  back = () => {
    const { goBack } = this.props

    goBack()
  }

  render() {
    const { title } = this.props

    return (
      <View style={styles.main}>
        <Touchable onPress={this.back}>
          <Image style={styles.back} source={back} />
        </Touchable>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    backgroundColor: Colors.background
  },
  back: {
    height: 20,
    margin: Layout.margin,
    width: 20
  },
  title: {
    ...Fonts.title,
    color: Colors.text,
    margin: Layout.margin,
    marginTop: 0
  }
})
