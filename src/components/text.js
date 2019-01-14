import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Fonts, Colors } from '../styles'

export default class TextView extends Component {
  render() {
    const {
      bold,
      center,
      children,
      color,
      left,
      right,
      semibold,
      small,
      style,
      subtitle,
      title
    } = this.props

    const fontStyle = [styles.text]

    if (bold) {
      fontStyle.push(styles.bold)
    }

    if (center) {
      fontStyle.push(styles.center)
    }

    if (left) {
      fontStyle.push(styles.left)
    }

    if (right) {
      fontStyle.push(styles.right)
    }

    if (semibold) {
      fontStyle.push(styles.semibold)
    }

    if (small) {
      fontStyle.push(styles.small)
    }

    if (subtitle) {
      fontStyle.push(styles.subtitle)
    }

    if (title) {
      fontStyle.push(styles.title)
    }

    if (color) {
      fontStyle.push({
        color
      })
    }

    fontStyle.push(style)

    return <Text style={fontStyle}>{children}</Text>
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontSize: Fonts.size.regular,
    lineHeight: Fonts.lineHeight.regular
  },
  bold: {
    fontWeight: Fonts.weight.bold
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  semibold: {
    fontWeight: Fonts.weight.semibold
  },
  small: {
    fontSize: Fonts.size.small,
    lineHeight: Fonts.lineHeight.small
  },
  subtitle: {
    fontSize: Fonts.size.subtitle,
    fontWeight: Fonts.weight.semibold,
    lineHeight: Fonts.lineHeight.subtitle
  },
  title: {
    fontSize: Fonts.size.title,
    fontWeight: Fonts.weight.bold,
    lineHeight: Fonts.lineHeight.title
  }
})
