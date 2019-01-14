import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../../styles'

import Text from '../text'
import Touchable from '../touchable'

class Zone extends Component {
  details = () => {
    const {
      id,
      navigation: { navigate }
    } = this.props

    navigate('Zone', {
      id
    })
  }

  render() {
    const { name, style } = this.props

    return (
      <Touchable style={[styles.main, style]} onPress={this.details}>
        <Text style={styles.name}>{name}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: Layout.margin
  },
  name: {
    color: Colors.text,
    flex: 1
  }
})

export default withNavigation(Zone)
