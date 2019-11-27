import { lowerCase, startCase } from 'lodash'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
      <Text style={styles.label}>{startCase(sortField)}</Text>
    </Touchable>
    <Touchable
      onPress={() => onChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc')}>
      <Text style={styles.label}>{lowerCase(sortOrder)}</Text>
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  label: {
    ...fonts.small,
    margin: layout.margin
  },
  main: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
