import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { sortBy } from 'lodash'

import { Colors, Layout } from '../styles'

import Icon from './icon'
import Text from './text'
import Separator from './separator'

export default class Abilities extends Component {
  renderHeader = () => {
    return (
      <Text style={styles.title} subtitle>
        Abilities
      </Text>
    )
  }

  renderItem = ({ item }) => {
    const { icon, name, requiredLevel } = item

    return (
      <View style={styles.item}>
        <Icon icon={icon} />
        <View style={styles.details}>
          <Text style={styles.name} semibold>
            {name}
          </Text>
          <Text style={styles.text} small>
            Required level {requiredLevel}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { data, style } = this.props

    return (
      <FlatList
        style={[styles.main, style]}
        data={sortBy(data, 'order')}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={Separator}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primaryDark
  },
  title: {
    color: Colors.accent,
    marginHorizontal: Layout.margin,
    marginTop: Layout.margin
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  details: {
    marginLeft: Layout.margin
  },
  name: {
    color: Colors.accent
  },
  text: {
    marginTop: Layout.padding
  }
})
