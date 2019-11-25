import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'

import { img_left } from '../assets'
import { colors, fonts, fontWeights, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  back?: boolean
  title: string
}

export const NavBar: FunctionComponent<Props> = ({ back, title }) => {
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
    backgroundColor: colors.black
  },
  title: {
    ...fonts.body,
    ...fontWeights.semibold,
    margin: layout.margin,
    marginHorizontal: layout.margin * 3,
    textAlign: 'center'
  }
})
