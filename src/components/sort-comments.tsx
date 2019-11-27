import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img_sort_down, img_sort_up } from '../assets'
import { colors, fonts, layout } from '../styles'
import { SortField, SortOrder } from '../types'
import { Touchable } from './touchable'

interface Props {
  sortField: SortField
  sortOrder: SortOrder

  onChange: (field: SortField, order: SortOrder) => void
}

export const SortComments: FunctionComponent<Props> = ({
  sortField,
  sortOrder,
  onChange
}) => (
  <View style={styles.main}>
    <Touchable
      onPress={() =>
        onChange(sortField === 'date' ? 'rating' : 'date', sortOrder)
      }>
      <Text style={styles.label}>Sort by {sortField}</Text>
    </Touchable>
    <Touchable
      onPress={() => onChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc')}>
      <Image
        style={styles.icon}
        source={sortOrder === 'asc' ? img_sort_up : img_sort_down}
      />
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  icon: {
    height: 20,
    margin: layout.margin,
    width: 20
  },
  label: {
    ...fonts.small,
    color: colors.accent,
    margin: layout.margin
  },
  main: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
