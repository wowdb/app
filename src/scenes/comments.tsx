import { cloneDeep, orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  LayoutAnimation,
  Linking,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_link } from '../assets'
import {
  Comment,
  NavBar,
  NotFound,
  Separator,
  SortComments,
  Spinner
} from '../components'
import { wowhead } from '../lib'
import { colors, fonts, layout } from '../styles'
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
  const title = getParam('title')
  const type = getParam('type')

  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<WowheadComment[]>([])
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }
  }, [])

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

  if (comments.length === 0) {
    return <NotFound />
  }

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'never'
      }}>
      {visible && (
        <View style={styles.header}>
          <Text style={styles.type}>{type.replace(/-/g, ' ')}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
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
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y > 200) {
            if (visible) {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              )

              setVisible(false)
            }
          } else if (!visible) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            setVisible(true)
          }
        }}
        renderItem={({ item }) => (
          <Comment comment={item} sortField={sortField} sortOrder={sortOrder} />
        )}
      />
    </SafeAreaView>
  )
}

Comments.navigationOptions = ({ navigation: { getParam } }) => {
  const classic = getParam('classic')
  const id = getParam('id')
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
        title="Comments"
      />
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.secondary,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: layout.margin
  },
  main: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    ...fonts.subtitle
  },
  type: {
    ...fonts.small,
    color: colors.gray,
    marginBottom: layout.padding
  }
})
