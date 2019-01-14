import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import { NavigationActions, withNavigation } from 'react-navigation'

import { left, help as helpIcon } from '../assets'
import { Colors, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

class NavBar extends Component {
  back = () => {
    const {
      navigation: { dispatch }
    } = this.props

    dispatch(NavigationActions.back())
  }

  help = () => {
    const {
      navigation: { navigate }
    } = this.props

    navigate('Help')
  }

  render() {
    const { back, help, title, subtitle } = this.props

    return (
      <SafeAreaView style={styles.main}>
        {back && (
          <Touchable onPress={this.back}>
            <Image style={styles.back} source={left} />
          </Touchable>
        )}
        {subtitle && (
          <Text style={styles.subtitle} semibold>
            {subtitle.toUpperCase()}
          </Text>
        )}
        {title && (
          <Text style={styles.title} title>
            {title}
          </Text>
        )}
        {help && (
          <Touchable style={styles.action} onPress={this.help}>
            <Image style={styles.icon} source={helpIcon} />
            <Text style={styles.help} semibold>
              Help
            </Text>
          </Touchable>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    backgroundColor: Colors.primary
  },
  back: {
    height: 20,
    margin: Layout.margin,
    width: 20
  },
  subtitle: {
    marginBottom: Layout.padding,
    marginHorizontal: Layout.margin
  },
  title: {
    margin: Layout.margin,
    marginTop: 0
  },
  action: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  icon: {
    height: 20,
    marginLeft: Layout.margin,
    marginRight: Layout.padding,
    marginVertical: Layout.margin,
    width: 20
  },
  help: {
    marginRight: Layout.margin,
    marginVertical: Layout.margin
  }
})

export default withNavigation(NavBar)
