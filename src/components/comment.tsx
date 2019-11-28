import { orderBy } from 'lodash'
import moment from 'moment'
import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview'

import { browser } from '../lib'
import { colors, fonts, layout } from '../styles'
import { SortField, SortOrder, WowheadComment } from '../types'
import { Touchable } from './touchable'

interface Props {
  comment: WowheadComment
  sortField: SortField
  sortOrder: SortOrder

  navigate: (classic: boolean, id: number, type: string) => void
}

export const Comment: FunctionComponent<Props> = ({
  comment,
  sortField,
  sortOrder,
  navigate
}) => {
  const [visible, setVisible] = useState(false)

  const openUri = (link: string) => {
    const matches = link.match(/(\w+).wowhead.com\/([\w-]+)(\/|=)(\d+)/)

    if (matches) {
      const [, domain, type, , id] = matches

      navigate(domain === 'classic', Number(id), type)

      return
    }

    browser.open(link)
  }

  return (
    <View>
      <View style={styles.main}>
        <HTMLView
          stylesheet={stylesheet}
          onLinkPress={link => openUri(link)}
          value={`<div>${comment.body}</div>`}
        />
        <View style={styles.footer}>
          <Text style={styles.label}>{comment.user}</Text>
          <Text style={styles.label}>{comment.rating}</Text>
          <Text style={styles.label}>{moment(comment.date).fromNow()}</Text>
          {comment.comments && comment.comments.length > 0 && (
            <Touchable
              style={styles.toggle}
              onPress={() => setVisible(!visible)}>
              <Text style={[styles.label, styles.toggleLabel]}>
                {visible ? 'Hide' : 'Show'} replies
              </Text>
            </Touchable>
          )}
        </View>
      </View>
      {visible &&
        comment.comments &&
        orderBy(comment.comments, sortField, sortOrder).map((reply, index) => (
          <View key={index} style={styles.reply}>
            <HTMLView
              stylesheet={stylesheetReply}
              onLinkPress={link => openUri(link)}
              value={`<div>${reply.body}</div>`}
            />
            <View style={styles.footer}>
              <Text style={styles.label}>{reply.user}</Text>
              <Text style={styles.label}>{reply.rating}</Text>
              <Text style={styles.label}>{moment(reply.date).fromNow()}</Text>
            </View>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    marginLeft: -layout.margin,
    marginTop: layout.margin
  },
  label: {
    ...fonts.small,
    color: colors.gray,
    marginLeft: layout.margin
  },
  main: {
    padding: layout.margin
  },
  reply: {
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: layout.border.radius,
    borderTopLeftRadius: layout.border.radius,
    marginBottom: layout.margin,
    marginLeft: layout.margin,
    padding: layout.padding
  },
  toggle: {
    marginLeft: 'auto'
  },
  toggleLabel: {
    color: colors.accent
  }
})

const stylesheet = StyleSheet.create({
  a: {
    color: colors.accent
  },
  div: {
    ...fonts.body
  }
})

const stylesheetReply = StyleSheet.create({
  a: {
    color: colors.accent
  },
  div: {
    ...fonts.small
  }
})
