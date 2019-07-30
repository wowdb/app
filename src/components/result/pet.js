import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../../styles'
import Icon from '../icon'
import Text from '../text'
import Touchable from '../touchable'

class Pet extends Component {
  details = () => {
    const {
      id,
      navigation: { navigate }
    } = this.props

    navigate('Item', {
      id
    })
  }

  render() {
    const { name, icon, quality, style } = this.props

    const color = {
      color: Colors.quality[quality]
    }

    return (
      <Touchable style={[styles.main, style]} onPress={this.details}>
        <Icon icon={icon} />
        <Text style={[styles.name, color]}>{name}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  name: {
    flex: 1,
    marginHorizontal: Layout.margin
  }
})

export default withNavigation(Pet)
