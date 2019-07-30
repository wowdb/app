import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../../styles'
import Icon from '../icon'
import Text from '../text'
import Touchable from '../touchable'

class Achievement extends Component {
  details = () => {
    const {
      id,
      navigation: { navigate }
    } = this.props

    navigate('Achievement', {
      id
    })
  }

  render() {
    const { name, icon, points, style } = this.props

    return (
      <Touchable style={[styles.main, style]} onPress={this.details}>
        <Icon icon={icon} />
        <Text style={styles.name}>{name}</Text>
        {points > 0 && (
          <Text style={styles.points} small>
            {points}
          </Text>
        )}
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
  },
  points: {
    color: Colors.textDark
  }
})

export default withNavigation(Achievement)
