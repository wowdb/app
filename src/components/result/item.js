import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../../styles'
import Icon from '../icon'
import Text from '../text'
import Touchable from '../touchable'

class Item extends Component {
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
    const { name, icon, quality, itemLevel, requiredLevel, style } = this.props

    const color = {
      color: Colors.quality[quality]
    }

    return (
      <Touchable style={[styles.main, style]} onPress={this.details}>
        <Icon icon={icon} />
        <Text style={[styles.name, color]}>{name}</Text>
        <View style={styles.level}>
          {itemLevel > 0 && (
            <Text style={styles.itemLevel} small>
              ilvl {itemLevel}
            </Text>
          )}
          {requiredLevel > 0 && (
            <Text style={styles.requiredLevel} small>
              req {requiredLevel}
            </Text>
          )}
        </View>
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
  level: {
    alignItems: 'flex-end'
  },
  itemLevel: {
    color: Colors.textDark
  },
  requiredLevel: {
    color: Colors.textDark
  }
})

export default withNavigation(Item)
