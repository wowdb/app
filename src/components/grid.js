import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

class Row extends Component {
  render() {
    const { children, style } = this.props

    return <View style={[styles.grid, style]}>{children}</View>
  }
}

class Column extends Component {
  render() {
    const { children, large, small, style } = this.props

    return (
      <View style={[!small && styles.column, large && styles.large, style]}>
        {children}
      </View>
    )
  }
}

export default {
  Row,
  Column
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    flex: 1
  },
  large: {
    flex: 2
  }
})
