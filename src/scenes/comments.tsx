import { cloneDeep, orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FlatList, Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_link } from '../assets'
import {
  Comment,
  NavBar,
  Separator,
  SortComments,
  Spinner
} from '../components'
import { wowhead } from '../lib'
import { colors } from '../styles'
import { SortField, SortOrder, WowheadComment } from '../types'

interface Props {
  classic: boolean
  id: number
  title: string
  type: string
}

export const Comments: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const classic = getParam('classic')
  const id = getParam('id')
  const type = getParam('type')

  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<WowheadComment[]>([])
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  useEffect(() => {
    setLoading(true)

    wowhead.comments(type, id, classic).then(comments => {
      setLoading(false)
      setComments(comments)
    })
  }, [classic, id, type])

  useEffect(() => {
    const copy = orderBy(cloneDeep(comments), sortField, sortOrder)

    const changed = copy.some((item, index) => comments[index].id !== item.id)

    if (changed) {
      setComments(copy)
    }
  }, [comments, sortField, sortOrder])

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
      <SortComments
        sortField={sortField}
        sortOrder={sortOrder}
        onChange={(field, order) => {
          setSortField(field)
          setSortOrder(order)
        }}
      />
      <FlatList
        data={comments}
        initialNumToRender={10}
        ItemSeparatorComponent={Separator}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    </SafeAreaView>
  )
}

Comments.navigationOptions = ({ navigation: { getParam } }) => {
  const classic = getParam('classic')
  const id = getParam('id')
  const title = getParam('title')
  const type = getParam('type')

  let separator = '='

  if (
    ['azerite-essence', 'azerite-essence-power', 'storyline'].includes(type)
  ) {
    separator = '/'
  }

  const uri = `https://${
    classic ? 'classic' : 'www'
  }.wowhead.com/${type}${separator}${id}`

  return {
    header: () => (
      <NavBar
        action={{
          icon: img_link,
          onPress: () => Linking.openURL(uri)
        }}
        back
        title={title}
      />
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'flex-end'
  }
})
