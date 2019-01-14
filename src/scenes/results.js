import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { capitalize, get, groupBy } from 'lodash'
import pluralize from 'pluralize'

import { search } from '../actions'
import {
  NavBar,
  NotFound,
  Result,
  Spinner,
  Text,
  Touchable
} from '../components'
import { Colors, Layout } from '../styles'

class Results extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar back subtitle="Search" title={navigation.getParam('query')} />
    )
  })

  state = {}

  componentDidMount = () => {
    const { navigation, search } = this.props

    const query = navigation.getParam('query')

    search(query)

    analytics.screen('Search', {
      query
    })
  }

  static getDerivedStateFromProps(props, state) {
    const { sections } = props
    const { active } = state

    if (active === undefined) {
      return {
        active: get(sections, 0)
      }
    }

    return null
  }

  setActive = item => {
    const { sections } = this.props

    this.setState({
      active: item
    })

    const index = sections.findIndex(section => section === item)

    if (index >= 0) {
      this.header.scrollToIndex({
        index,
        viewOffset: index > 0 && Layout.margin * 3
      })
      this.list.scrollToIndex({
        index
      })
    }
  }

  onMomentumScrollEnd = event => {
    const { sections } = this.props

    const x = get(event, 'nativeEvent.contentOffset.x')

    const index = get(sections, x / width)

    if (index) {
      this.setActive(index)
    }
  }

  getItemLayout = (data, index) => {
    return {
      index,
      length: width,
      offset: width * index
    }
  }

  navigate = (item, type) => {
    const {
      navigation: { navigate }
    } = this.props

    navigate('details', {
      item,
      type
    })
  }

  renderHeader = ({ item }) => {
    const { results } = this.props
    const { active } = this.state

    const { length } = results.filter(({ type }) => type === item)

    return (
      <Touchable onPress={() => this.setActive(item)}>
        <Text style={[styles.section, active === item && styles.active]} zero>
          {capitalize(pluralize(item))} ({length})
        </Text>
      </Touchable>
    )
  }

  renderSection = ({ item }) => {
    const { results } = this.props

    const data = results.filter(({ type }) => type === item)

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderItem}
      />
    )
  }

  renderEmpty = () => {
    return <NotFound style={styles.item} />
  }

  renderItem = ({ item }) => {
    return <Result style={styles.item} {...item} />
  }

  render() {
    const { sections, loading } = this.props

    if (loading) {
      return <Spinner full />
    }

    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.header}>
          <FlatList
            ref={header => {
              this.header = header
            }}
            data={sections}
            extraData={this.state}
            horizontal
            keyExtractor={item => item}
            renderItem={this.renderHeader}
          />
        </View>
        <FlatList
          ref={list => {
            this.list = list
          }}
          data={sections}
          getItemLayout={this.getItemLayout}
          horizontal
          keyExtractor={item => item}
          ListEmptyComponent={this.renderEmpty}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          pagingEnabled
          renderItem={this.renderSection}
        />
      </SafeAreaView>
    )
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    flex: 1
  },
  header: {
    backgroundColor: Colors.primaryDark
  },
  section: {
    color: Colors.text,
    padding: Layout.margin
  },
  active: {
    color: Colors.accent
  },
  empty: {
    color: Colors.textDark,
    margin: Layout.margin
  },
  item: {
    width,
    padding: Layout.margin
  }
})

const mapStateToProps = ({ results: { results, loading } }) => {
  const groups = groupBy(results, 'type')

  const sections = Object.keys(groups).sort()

  return {
    loading,
    results,
    sections
  }
}

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(search(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
