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
    reverse: true,
    visible: new Map()
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

  toggleReplies = id => {
    this.setState(state => {
      const { visible } = state

      const current = visible.get(id)

      visible.set(id, !current)

      return {
        visible
      }
    })
  }

  renderHeader = () => {
    const { sort, reverse } = this.state

    return (
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <View style={styles.sort}>
          <Touchable onPress={this.toggleSort}>
            <Text style={styles.sortLabel}>{capitalize(sort)}</Text>
          </Touchable>
          <Touchable onPress={this.toggleReverse}>
            <Image
              style={styles.sortIcon}
              source={reverse ? sort_down : sort_up}
            />
          </Touchable>
        </View>
      </View>
    )
  }

  renderEmpty = () => {
    return <Text style={styles.empty}>Nothing found</Text>
  }

  renderReply = item => {
    const { id, body, user, rating, date } = item

    const color = {
      color: rating > 10 ? Colors.comments.green : Colors.text
    }

    return (
      <View key={id} style={styles.reply}>
        <Separator style={styles.replySeparator} />
        <Text style={styles.replyBody}>{body}</Text>
        <View style={styles.footer}>
          <Text style={[styles.rating, color]}>{rating}</Text>
          <Text style={styles.meta}>{user}</Text>
          <Text style={styles.meta}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    )
  }

  renderItem = item => {
    const { visible } = this.state

    const { id, body, user, rating, date, replies } = item

    const show = visible.get(id)

    const color = {
      color: rating > 10 ? Colors.comments.green : Colors.text
    }

    return (
      <View style={styles.comment}>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.footer}>
          <Text style={[styles.rating, color]}>{rating}</Text>
          <Text style={styles.meta}>{user}</Text>
          <Text style={styles.meta}>{moment(date).fromNow()}</Text>
          {replies.length > 0 && (
            <Touchable
              style={styles.toggleReplies}
              onPress={() => this.toggleReplies(id)}
            >
              <Text style={styles.meta}>{show ? 'Hide' : 'Show'} replies</Text>
            </Touchable>
          )}
        </View>
        {show && (
          <View style={styles.replies}>{replies.map(this.renderReply)}</View>
        )}
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
    justifyContent: 'space-between'
  },
  title: {
    ...Fonts.subtitle,
    color: Colors.text,
    marginHorizontal: Layout.margin
  },
  sort: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  sortIcon: {
    height: 20,
    margin: Layout.margin,
    width: 20
  },
  sortLabel: {
    color: Colors.text,
    margin: Layout.margin
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
  meta: {
    color: Colors.textDark,
    fontSize: 12,
    marginLeft: Layout.margin
  },
  toggleReplies: {
    margin: -Layout.margin,
    padding: Layout.margin
  },
  replies: {
    marginLeft: Layout.margin
  },
  reply: {
    marginTop: Layout.margin
  },
  replySeparator: {
    marginBottom: Layout.margin
  },
  replyBody: {
    color: Colors.text,
    fontSize: 12
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
