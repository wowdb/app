import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'

import { img_left } from '../assets'
import { colors, fonts, fontWeights, layout } from '../styles'
import { NavBarAction } from '../types'
import { Touchable } from './touchable'

interface Props {
  action?: NavBarAction
  back?: boolean
  title: string
}

export const NavBar: FunctionComponent<Props> = ({ action, back, title }) => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'never',
        top: 'always'
      }}>
      <Text style={styles.title}>{title}</Text>
      {back && (
        <Touchable style={styles.left} onPress={() => goBack()}>
          <Image style={styles.icon} source={img_left} />
        </Touchable>
      )}
      {action && (
        <Touchable style={styles.right} onPress={() => action.onPress()}>
          <Image style={styles.icon} source={action.icon} />
        </Touchable>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: layout.margin,
    margin: layout.margin,
    width: layout.margin
  },
  left: {
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.secondary
  },
  right: {
    bottom: 0,
    position: 'absolute',
    right: 0
  },
  title: {
    ...fonts.body,
    ...fontWeights.semibold,
    margin: layout.margin,
    marginHorizontal: layout.margin * 3,
    textAlign: 'center'
  }
})
