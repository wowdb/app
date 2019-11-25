import React, { useState } from 'react'
import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_wowdb } from '../assets'
import { Button, TextBox } from '../components'
import { colors, fonts, fontWeights, layout } from '../styles'

export const Landing: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [classic, setClassic] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'always'
      }}>
      <View style={styles.content}>
        <Image style={styles.wowdb} source={img_wowdb} />
        <Text style={styles.title}>WoWdb</Text>
        <Text style={styles.description}>
          WoWdb lets you search for World of Warcraft quests, achievements,
          items, spells, and more. It also supports WoW Classic and lets you
          read comments from Wowhead.
        </Text>
      </View>
      <View style={styles.footer}>
        <TextBox
          autoCapitalize={false}
          autoCorrect={false}
          onChange={query => setQuery(query)}
          placeholder={classic ? 'Molten Core' : 'The Eternal Place'}
          value={query}
        />
        <Button
          style={styles.button}
          label={classic ? 'Search classic' : 'Search'}
          onPress={() => {
            if (query.length > 1) {
              navigate('Search', {
                classic,
                query
              })
            }
          }}
        />
        <View style={styles.toggle}>
          <Text style={styles.label}>Classic</Text>
          <Switch
            ios_backgroundColor={colors.black}
            onValueChange={classic => setClassic(classic)}
            trackColor={{ false: colors.black, true: colors.accent }}
            value={classic}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

Landing.navigationOptions = {
  header: () => null
}

const styles = StyleSheet.create({
  button: {
    marginTop: layout.margin
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  description: {
    ...fonts.body,
    color: colors.midGray,
    textAlign: 'center'
  },
  footer: {
    padding: layout.margin
  },
  label: {
    ...fonts.body,
    color: colors.gray,
    flex: 1,
    marginRight: layout.margin,
    textAlign: 'right'
  },
  main: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    ...fonts.title,
    ...fontWeights.semibold,
    color: colors.white,
    marginVertical: layout.margin
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: layout.margin
  },
  wowdb: {
    height: 100,
    width: 100
  }
})
