import React, { Component } from 'react'
import { Image, FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { capitalize, sortBy } from 'lodash'

import { getComments } from '../actions'
import { sort_up, sort_down } from '../assets'
import { Main, NavBar, Separator, Spinner, Touchable } from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Details extends Component {
  static navigationOptions = ({
    navigation: { goBack, state: { params: { item: { name, title }, type } } }
  }) => ({
    header: (
      <NavBar
        title={title || name}
        subtitle={type.substr(0, type.length - 1)}
        goBack={goBack}
      />
    )
  })

  state = {
    sort: 'date',
    reverse: true
  }

  componentDidMount() {
    const { item, type, getComments } = this.props

    const { id } = item

    getComments(id, type)
  }

  toggleReverse = () => {
    const { reverse } = this.state

    this.setState({
      reverse: !reverse
    })
  }

  toggleSort = () => {
    const { sort } = this.state

    this.setState({
      sort: sort === 'date' ? 'rating' : 'date'
    })
  }

  renderHeader = () => {
    const { sort, reverse } = this.state

    return (
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <View style={styles.sort}>
          <Touchable onPress={this.toggleReverse}>
            <Image
              style={styles.sortIcon}
              source={reverse ? sort_down : sort_up}
            />
          </Touchable>
          <Touchable onPress={this.toggleSort}>
            <Text style={styles.sortLabel}>{capitalize(sort)}</Text>
          </Touchable>
        </View>
      </View>
    )
  }

  renderEmpty = () => {
    return <Text style={styles.empty}>Nothing found</Text>
  }

  renderItem = item => {
    const { body, user, rating, date } = item

    const color = {
      color: rating > 10 ? Colors.comments.green : Colors.text
    }

    return (
      <View style={styles.comment}>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.footer}>
          <Text style={[styles.rating, color]}>{rating}</Text>
          <Text style={styles.user}>{user}</Text>
          <Text style={styles.date}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { data, loading } = this.props
    const { sort, reverse } = this.state

    let comments = sortBy(data, sort)

    if (reverse) {
      comments = comments.reverse()
    }

    return (
      <Main style={loading && styles.loading}>
        {loading && <Spinner />}
        {!loading && (
          <FlatList
            data={comments}
            ItemSeparatorComponent={Separator}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.renderEmpty}
            ListHeaderComponent={this.renderHeader}
            refreshing={loading}
            renderItem={({ item }) => this.renderItem(item)}
          />
        )}
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.margin
  },
  title: {
    ...Fonts.subtitle,
    color: Colors.text
  },
  sort: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  sortIcon: {
    height: 20,
    width: 20
  },
  sortLabel: {
    color: Colors.text
  },
  comment: {
    padding: Layout.margin
  },
  body: {
    color: Colors.text
  },
  footer: {
    flexDirection: 'row',
    marginTop: Layout.margin
  },
  rating: {
    color: Colors.text,
    fontSize: 12
  },
  user: {
    color: Colors.textDark,
    fontSize: 12,
    marginLeft: Layout.margin
  },
  date: {
    color: Colors.textDark,
    fontSize: 12,
    marginLeft: Layout.margin
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: {
    color: Colors.text,
    margin: Layout.margin
  }
})

const mapStateToProps = (state, props) => {
  const { navigation: { state: { params: { item, type } } } } = props

  const { comments: { data, loading } } = state

  return {
    item,
    type,
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComments: (id, type) => dispatch(getComments(id, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
