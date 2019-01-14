import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../../styles'

import Text from '../text'
import Touchable from '../touchable'

class Quest extends Component {
  details = () => {
    const {
      id,
      navigation: { navigate }
    } = this.props

    navigate('Quest', {
      id
    })
  }

  render() {
    const { name, reqLevel, style } = this.props

    return (
      <Touchable style={[styles.main, style]} onPress={this.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.level}>{reqLevel}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: Layout.margin
  },
  title: {
    color: Colors.text,
    flex: 1,
    marginRight: Layout.margin
  },
  level: {
    color: Colors.textDark
  }
})

export default withNavigation(Quest)
