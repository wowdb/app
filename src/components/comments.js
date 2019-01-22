import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { capitalize, sortBy } from 'lodash'
import moment from 'moment'
import HTMLView from 'react-native-htmlview'

import { sort_up, sort_down } from '../assets'
import { Colors, Fonts, Layout } from '../styles'

import Separator from './separator'
import Text from './text'
import Touchable from './touchable'

export default class Comments extends Component {
  state = {
    expanded: new Map(),
    reverse: true,
    sort: 'rating'
  }

  toggleReverse = () => {
    const { reverse } = this.state

    const next = !reverse

    this.setState({
      reverse: next
    })
  }

  toggleSort = () => {
    const { sort } = this.state

    this.setState({
      sort: sort === 'date' ? 'rating' : 'date'
    })
  }

  toggleReplies = id => {
    const { expanded } = this.state

    expanded.set(id, !expanded.get(id))

    this.setState({
      expanded
    })
  }

  getStyles(rating) {
    let color = Colors.text

    if (rating > 10) {
      color = Colors.comments.green
    } else if (rating < 0) {
      color = Colors.comments.gray
    }

    return StyleSheet.create({
      a: {
        color: Colors.accent
      },
      div: {
        color,
        fontSize: Fonts.size.regular,
        lineHeight: Fonts.lineHeight.regular
      }
    })
  }

  renderHeader = () => {
    const { sort, reverse } = this.state

    return (
      <View style={styles.header}>
        <Text style={styles.subtitle} subtitle>
          Comments
        </Text>
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
    return (
      <Text style={styles.empty} small>
        Nothing found
      </Text>
    )
  }

  renderReply = item => {
    const { body, date, id, rating, user } = item

    return (
      <View key={id} style={styles.reply}>
        <Separator style={styles.replySeparator} />
        <HTMLView
          stylesheet={this.getStyles(rating)}
          value={`<div>${body}</div>`}
        />
        <View style={styles.footer}>
          <Text style={styles.rating} small>
            {rating}
          </Text>
          <Text style={styles.meta} small>
            {user}
          </Text>
          <Text style={styles.meta} small>
            {moment(date).fromNow()}
          </Text>
        </View>
      </View>
    )
  }

  renderItem = ({ item }) => {
    const { expanded, sort, reverse } = this.state

    const { id, body, user, rating, date, replies } = item

    const show = expanded.get(id)

    let comments = sortBy(replies, sort)

    if (reverse) {
      comments = comments.reverse()
    }

    return (
      <View>
        <View style={styles.comment}>
          <HTMLView
            stylesheet={this.getStyles(rating)}
            value={`<div>${body}</div>`}
          />
          <View style={styles.footer}>
            <Text style={styles.rating} small>
              {rating}
            </Text>
            <Text style={styles.meta} small>
              {user}
            </Text>
            <Text style={styles.meta} small>
              {moment(date).fromNow()}
            </Text>
            {replies.length > 0 && (
              <Touchable
                style={styles.toggleReplies}
                onPress={() => this.toggleReplies(id)}
              >
                <Text style={styles.meta} small semibold>
                  {show ? 'Hide' : 'Show'} replies
                </Text>
              </Touchable>
            )}
          </View>
          {show && (
            <View style={styles.replies}>{comments.map(this.renderReply)}</View>
          )}
        </View>
      </View>
    )
  }

  render() {
    const { data, style } = this.props
    const { sort, reverse } = this.state

    let comments = sortBy(data, sort)

    if (reverse) {
      comments = comments.reverse()
    }

    return (
      <FlatList
        style={[styles.main, style]}
        data={comments}
        initialNumToRender={5}
        ItemSeparatorComponent={Separator}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={this.renderEmpty}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: Colors.accent,
    flex: 1,
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
    margin: Layout.margin
  },
  comment: {
    padding: Layout.margin
  },
  footer: {
    flexDirection: 'row',
    marginTop: Layout.margin
  },
  rating: {
    color: Colors.textDark
  },
  meta: {
    color: Colors.textDark,
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
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: {
    margin: Layout.margin,
    marginTop: 0
  }
})
