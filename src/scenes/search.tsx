import { startCase } from 'lodash'
import React, { useEffect, useState } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { NavBar, Result, Separator, Spinner } from '../components'
import { wowhead } from '../lib'
import { colors, fonts, fontWeights, layout } from '../styles'
import { SearchResult } from '../types'

interface Props {
  classic: boolean
  query: string
}

export const Search: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const classic = getParam('classic')
  const query = getParam('query')

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    setLoading(true)

    wowhead.search(query, classic).then(results => {
      setResults(results)
      setLoading(false)
    })
  }, [classic, query])

  if (loading) {
    return <Spinner full />
  }

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'never'
      }}>
      <SectionList
        ItemSeparatorComponent={Separator}
        renderItem={({ item, section: { type } }) => (
          <Result data={item} type={type} />
        )}
        renderSectionHeader={({ section: { data, type } }) => (
          <View style={styles.header}>
            <Text style={styles.title}>{startCase(type)}</Text>
            <Text style={styles.count}>{data.length}</Text>
          </View>
        )}
        sections={results}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  )
}

Search.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={`Results for "${getParam('query')}"`} />
})

const styles = StyleSheet.create({
  count: {
    ...fonts.body,
    color: colors.midGray
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: layout.margin
  },
  main: {
    backgroundColor: colors.primary,
    flex: 1
  },
  title: {
    ...fonts.subtitle,
    ...fontWeights.semibold,
    color: colors.accent,
    flex: 1
  }
})
