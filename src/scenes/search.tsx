import { startCase } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { NavBar, Result, Separator, Spinner, Touchable } from '../components'
import { wowhead } from '../lib'
import { colors, fonts, fontWeights, layout } from '../styles'
import { WowheadResults } from '../types'

interface Props {
  classic: boolean
  query: string
}

export const Search: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate }
}) => {
  const classic = getParam('classic')
  const query = getParam('query')

  const header = useRef<FlatList<WowheadResults>>(null)
  const list = useRef<FlatList<WowheadResults>>(null)

  const [active, setActive] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<WowheadResults[]>([])

  useEffect(() => {
    setLoading(true)

    wowhead.search(query, classic).then(results => {
      setActive(0)
      setLoading(false)
      setResults(results)
    })
  }, [classic, query])

  useEffect(() => {
    if (active !== undefined) {
      if (header.current) {
        header.current.scrollToIndex({
          animated: true,
          index: active
        })
      }

      if (list.current) {
        list.current.scrollToIndex({
          animated: true,
          index: active
        })
      }
    }
  }, [active])

  if (loading) {
    return <Spinner full />
  }

  const { width } = Dimensions.get('window')

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'never'
      }}>
      <View style={styles.header}>
        <FlatList
          ref={header}
          data={results}
          horizontal
          keyExtractor={item => item.type}
          renderItem={({ item, index }) => (
            <Touchable onPress={() => setActive(index)}>
              <Text style={[styles.section, active === index && styles.active]}>
                {startCase(item.type).replace(/npc/i, 'NPC')} (
                {item.data.length})
              </Text>
            </Touchable>
          )}
        />
      </View>
      <FlatList
        ref={list}
        data={results}
        getItemLayout={(data, index) => ({
          index,
          length: width,
          offset: width * index
        })}
        horizontal
        keyExtractor={item => item.type}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width)

          setActive(index)
        }}
        pagingEnabled
        renderItem={({ item }) => (
          <FlatList
            style={{
              width
            }}
            data={item.data}
            keyExtractor={item => String(item.id)}
            ItemSeparatorComponent={Separator}
            renderItem={({ item: data }) => (
              <Result
                data={data}
                type={item.type}
                onPress={() =>
                  navigate('Comments', {
                    classic,
                    id: data.id,
                    title: data.name || data.namehorde,
                    type: item.template
                  })
                }
              />
            )}
          />
        )}
      />
    </SafeAreaView>
  )
}

Search.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={`Results for "${getParam('query')}"`} />
})

const styles = StyleSheet.create({
  active: {
    color: colors.accent
  },
  header: {
    backgroundColor: colors.secondary
  },
  main: {
    backgroundColor: colors.primary,
    flex: 1
  },
  section: {
    ...fonts.body,
    ...fontWeights.semibold,
    color: colors.white,
    padding: layout.margin
  }
})
