import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'

import { img_border } from '../assets'
import { img } from '../lib'
import { colors, fonts, fontWeights, textShadow } from '../styles'
import { IconType } from '../types'

interface Props {
  icon: string
  quantity?: number
  size?: 'large' | 'small'
  style?: ViewStyle
  type?: IconType
}

export const Icon: FunctionComponent<Props> = ({
  icon,
  quantity,
  size = 'large',
  style,
  type = 'default'
}) => {
  return (
    <View style={[styles.image, style]}>
      <Image
        style={[styles.border, size === 'small' && styles.borderSmall]}
        source={img_border}
      />
      <Image
        style={[styles.icon, size === 'small' && styles.iconSmall]}
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
  borderSmall: {
    height: 44,
    width: 44
  },
  icon: {
    backgroundColor: colors.black,
    height: 56,
    position: 'absolute',
    width: 56
  },
  iconSmall: {
    height: 36,
    width: 36
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
