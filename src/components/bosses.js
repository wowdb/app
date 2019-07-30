import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Colors, Layout } from '../styles'
import Separator from './separator'
import Text from './text'
import Touchable from './touchable'

class Bosses extends Component {
  details = id => {
    const {
      navigation: { navigate }
    } = this.props

    navigate('Boss', {
      id
    })
  }

  renderHeader = () => {
    return (
      <Text style={styles.title} subtitle>
        Bosses
      </Text>
    )
  }

  renderItem = ({ item }) => {
    const { description, id, name, npcs } = item

    return (
      <Touchable style={styles.item} onPress={() => this.details(id)}>
        <Text style={styles.name} semibold>
          {name}
        </Text>
        {description && (
          <Text style={styles.text} small>
            {description}
          </Text>
        )}
        {npcs.length > 1 && (
          <View>
            <Text style={[styles.name, styles.text]} semibold small>
              NPCs
            </Text>
            <Text style={styles.text} small>
              {npcs.map(({ name }) => name).join(', ')}
            </Text>
          </View>
        )}
      </Touchable>
    )
  }

  render() {
    const { data, style } = this.props

    return (
      <FlatList
        style={[styles.main, style]}
        data={data}
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
    padding: Layout.margin
  },
  name: {
    color: Colors.accent
  },
  text: {
    marginTop: Layout.padding
  }
})

export default withNavigation(Bosses)
