import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { IndicatorViewPager } from 'rn-viewpager'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'

import { search } from '../actions'
import {
  Achievement,
  Button,
  Item,
  Main,
  Mount,
  NavBar,
  NPC,
  Pet,
  Quest,
  Separator,
  Spinner,
  TextBox,
  Touchable,
  Zone
} from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Results extends Component {
  static navigationOptions = ({
    navigation: { goBack, state: { params: { query } } }
  }) => ({
    header: <NavBar title={query} subtitle="Search" goBack={goBack} />
  })

  state = {
    active: 'achievements'
  }

  componentDidMount() {
    const { query, search } = this.props

    search(query)
  }

  setActive = data => {
    const { sections } = this.props

    if (typeof data === 'string') {
      const index = sections.findIndex(section => section === data)

      this.setState(
        {
          active: data
        },
        () => this.refs.tabs.setPage(index)
      )
    } else {
      const { position } = data

      const active = sections[position]

      this.setState({
        active
      })

      this.refs.sections.scrollToIndex({
        index: position
      })
    }
  }

  navigate = (item, type) => {
    const { navigation: { navigate } } = this.props

    navigate('details', {
      item,
      type
    })
  }

  renderSection = item => {
    const { data } = this.props
    const { active } = this.state

    return (
      <Touchable onPress={() => this.setActive(item)}>
        <Text style={[styles.section, active === item && styles.active]}>
          {item === 'npcs' ? 'NPCs' : capitalize(item)} ({data[item].length})
        </Text>
        {active === item && <View style={styles.activeLine} />}
      </Touchable>
    )
  }

  renderEmpty = () => {
    return <Text style={styles.empty}>Nothing found</Text>
  }

  renderItem = (section, item) => {
    switch (section) {
      case 'achievements':
        return (
          <Achievement {...item} onPress={() => this.navigate(item, section)} />
        )

      case 'items':
        return <Item {...item} onPress={() => this.navigate(item, section)} />

      case 'mounts':
        return <Mount {...item} onPress={() => this.navigate(item, section)} />

      case 'npcs':
        return <NPC {...item} onPress={() => this.navigate(item, section)} />

      case 'pets':
        return <Pet {...item} onPress={() => this.navigate(item, section)} />

      case 'quests':
        return <Quest {...item} onPress={() => this.navigate(item, section)} />

      case 'zones':
        return <Zone {...item} onPress={() => this.navigate(item, section)} />
    }
  }

  render() {
    const { data, loading, sections } = this.props
    const { active } = this.state

    return (
      <Main>
        <View>
          <FlatList
            ref="sections"
            style={styles.sections}
            data={sections}
            extraData={active}
            horizontal={true}
            keyExtractor={item => item}
            renderItem={({ item }) => this.renderSection(item)}
          />
        </View>
        <Main style={loading && styles.loading}>
          {loading && <Spinner />}
          {!loading && (
            <IndicatorViewPager
              ref="tabs"
              style={styles.tab}
              onPageSelected={this.setActive}
            >
              {sections.map(section => (
                <View key={section}>
                  <FlatList
                    data={data[section]}
                    initialNumToRender={5}
                    ItemSeparatorComponent={Separator}
                    keyExtractor={item =>
                      String(
                        item.id ||
                          item.itemId ||
                          item.creatureId ||
                          item.spellId
                      )
                    }
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={({ item }) => this.renderItem(section, item)}
                  />
                </View>
              ))}
            </IndicatorViewPager>
          )}
        </Main>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  sections: {
    backgroundColor: Colors.primary
  },
  section: {
    color: Colors.text,
    padding: Layout.margin
  },
  active: {
    color: Colors.accent
  },
  activeLine: {
    backgroundColor: Colors.accent,
    height: 2,
    marginHorizontal: Layout.margin
  },
  tab: {
    flex: 1
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: {
    color: Colors.textDark,
    margin: Layout.margin
  }
})

const mapStateToProps = (state, props) => {
  const { navigation: { state: { params: { query } } } } = props

  const { results: { data, loading } } = state

  const sections = Object.keys(data)

  return {
    query,
    data,
    loading,
    sections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
