import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'

import { img_border } from '../assets'
import { img } from '../lib'
import { colors, fonts, fontWeights, textShadow } from '../styles'
import { IconType } from '../types'

interface Props {
  icon: string
  quantity?: number
  style?: ViewStyle
  type: IconType
}

export const Icon: FunctionComponent<Props> = ({
  icon,
  quantity,
  style,
  type
}) => {
  return (
    <View style={[styles.image, style]}>
      <Image style={styles.border} source={img_border} />
      <Image
        style={styles.icon}
        source={{
          uri: img.getUri(type, icon)
        }}
      />
      {quantity !== undefined && (
        <Text style={styles.quantity}>{quantity}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    height: 68,
    width: 68
  },
  icon: {
    backgroundColor: colors.black,
    height: 56,
    position: 'absolute',
    width: 56
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  quantity: {
    ...fonts.body,
    ...fontWeights.bold,
    ...textShadow,
    bottom: 6,
    position: 'absolute',
    right: 10
  }
})
