import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_wowdb } from '../assets'
import { Button, TextBox } from '../components'
import { colors, fonts, layout } from '../styles'

export const Landing: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [classic, setClassic] = useState(false)
  const [query, setQuery] = useState('')

  const search = () => {
    if (query.length > 3) {
      navigate('Search', {
        classic,
        query
      })
    }
  }

  return (
    <SafeAreaView
      style={styles.safe}
      forceInset={{
        bottom: 'always',
        top: 'always'
      }}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
        <View style={styles.content}>
          <Image style={styles.wowdb} source={img_wowdb} />
          <Text style={styles.title}>WoWdb</Text>
          <Text style={styles.description}>
            Search for items, quests, NPCs, and more
          </Text>
          <Text style={styles.description}>
            Read comments to guide you through a tricky achievement or a
            difficult mob
          </Text>
          <Text style={styles.description}>View full details on Wowhead</Text>
        </View>
        <View style={styles.footer}>
          <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={query => setQuery(query)}
            placeholder={classic ? 'Molten Core' : 'The Eternal Place'}
            returnKeyType="search"
            onSubmitEditing={search}
            value={query}
          />
          <Button style={styles.button} label="Search" onPress={search} />
          <View style={styles.toggle}>
            <Text style={styles.label}>Classic</Text>
            <Switch
              ios_backgroundColor={colors.black}
              onValueChange={classic => setClassic(classic)}
              trackColor={{
                false: colors.black,
                true: colors.accent
              }}
              value={classic}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
    marginTop: layout.padding,
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
    flex: 1,
    justifyContent: 'flex-end'
  },
  safe: {
    backgroundColor: colors.primary,
    flex: 1
  },
  title: {
    ...fonts.title,
    color: colors.white,
    marginBottom: layout.padding,
    marginTop: layout.margin
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
