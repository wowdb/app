import {
  ADMOB_UNIT_ID_COMMENT_ANDROID,
  ADMOB_UNIT_ID_COMMENT_IOS
} from 'react-native-dotenv'

import React, { Component } from 'react'
import {
  Image,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { capitalize, sortBy } from 'lodash'

import { getComments } from '../actions'
import { sort_up, sort_down } from '../assets'
import { Ad, Main, NavBar, Separator, Spinner, Touchable } from '../components'
import { analytics } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

class Details extends Component {
  static navigationOptions = ({
    navigation: {
      goBack,
      state: {
        params: {
          item: { name, title },
          type
        }
      }
    }
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

    const { id, itemId, creatureId, spellId } = item

    let actualType

    if (id) {
      actualType = type
    } else if (itemId) {
      actualType = 'items'
    } else if (creatureId) {
      actualType = 'npcs'
    } else if (spellId) {
      actualType = 'spells'
    }

    getComments(id || itemId || creatureId || spellId, actualType)

    this.setState({
      id: id || itemId || creatureId || spellId,
      type: actualType
    })

    analytics.screen('details', {
      id: id || itemId || creatureId || spellId,
      type: actualType
    })
  }

  toggleReverse = () => {
    const { id, type, sort, reverse } = this.state

    const nextReverse = !reverse

    this.setState({
      reverse: nextReverse
    })

    analytics.track('details_toggle_sort', {
      id,
      type,
      field: sort,
      direction: nextReverse ? 'asc' : 'desc'
    })
  }

  toggleSort = () => {
    const { id, type, sort, reverse } = this.state

    const nextSort = sort === 'date' ? 'rating' : 'date'

    this.setState({
      sort: nextSort
    })

    analytics.track('details_toggle_sort', {
      id,
      type,
      field: nextSort,
      direction: reverse ? 'asc' : 'desc'
    })
  }

  toggleReplies = commentId => {
    const { id, type } = this.props
    const { visible } = this.state

    const current = visible.get(commentId)

    const nextCurrent = !current

    visible.set(commentId, nextCurrent)

    this.setState({
      visible
    })

    analytics.track('details_toggle_replies', {
      id,
      type,
      commentId,
      show: nextCurrent
    })
  }

  getCommentStyle(rating) {
    const style = {
      color: Colors.text
    }

    if (rating > 10) {
      style.color = Colors.comments.green
    } else if (rating < 0) {
      style.color = Colors.comments.gray
    }

    return style
  }

  openLink = () => {
    const {
      item: { id },
      type
    } = this.props

    const url = `https://www.wowhead.com/${type.substr(
      0,
      type.length - 1
    )}=${id}`

    Linking.openURL(url)

    analytics.track('wowhead_link_opened', {
      url
    })
  }

  renderHeader = () => {
    const { sort, reverse } = this.state

    return (
      <View style={styles.header}>
        <Touchable onPress={this.openLink}>
          <Text style={styles.subtitle}>Comments from Wowhead</Text>
        </Touchable>
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

    const color = this.getCommentStyle(rating)

    return (
      <View key={id} style={styles.reply}>
        <Separator style={styles.replySeparator} />
        <Text style={[styles.replyBody, color]}>{body}</Text>
        <View style={styles.footer}>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.meta}>{user}</Text>
          <Text style={styles.meta}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    )
  }

  renderItem = (item, index) => {
    const { sort, reverse, visible } = this.state

    const { id, body, user, rating, date, replies } = item

    const show = visible.get(id)

    const color = this.getCommentStyle(rating)

    const unitId = Platform.select({
      android: ADMOB_UNIT_ID_COMMENT_ANDROID,
      ios: ADMOB_UNIT_ID_COMMENT_IOS
    })

    let comments = sortBy(replies, sort)

    if (reverse) {
      comments = comments.reverse()
    }

    return (
      <View>
        {++index % 5 === 0 && <Ad id={unitId} />}
        <View style={styles.comment}>
          <Text style={[styles.body, color]}>{body}</Text>
          <View style={styles.footer}>
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.meta}>{user}</Text>
            <Text style={styles.meta}>{moment(date).fromNow()}</Text>
            {replies.length > 0 && (
              <Touchable
                style={styles.toggleReplies}
                onPress={() => this.toggleReplies(id)}
              >
                <Text style={styles.meta}>
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
            initialNumToRender={5}
            ItemSeparatorComponent={Separator}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={this.renderEmpty}
            ListHeaderComponent={this.renderHeader}
            refreshing={loading}
            renderItem={({ index, item }) => this.renderItem(item, index)}
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
  subtitle: {
    color: Colors.text,
    fontWeight: Fonts.weight.semibold,
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
    color: Colors.textDark,
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
  const {
    navigation: {
      state: {
        params: { item, type }
      }
    }
  } = props

  const {
    comments: { data, loading }
  } = state

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
