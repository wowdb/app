import React, { Component } from 'react'
import { Image, View } from 'react-native'

import { border } from '../assets'
import { Layout } from '../styles'

export default class Icon extends Component {
  render() {
    const { icon, style } = this.props

    const image = {
      uri: `https://render-eu.worldofwarcraft.com/icons/56/${icon}.jpg`
    }

    return (
      <View style={style}>
        <Image source={image} style={Layout.item.icon} />
        <Image source={border} style={Layout.item.border} />
      </View>
    )
  }
}
