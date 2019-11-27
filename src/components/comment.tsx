import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview'

import { colors, fonts, layout } from '../styles'
import { WowheadComment } from '../types'

interface Props {
  comment: WowheadComment
}

export const Comment: FunctionComponent<Props> = ({ comment }) => (
  <View style={styles.main}>
    <HTMLView stylesheet={stylesheet} value={`<div>${comment.body}</div>`} />
    <View style={styles.footer}>
      <Text style={styles.label}>{comment.user}</Text>
      <Text style={styles.label}>{comment.rating}</Text>
      <Text style={styles.label}>{moment(comment.date).fromNow()}</Text>
    </View>
  </View>
)

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
