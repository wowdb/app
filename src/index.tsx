import React from 'react'
import { StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Comments, Landing, Search } from './scenes'

const Navigator = createStackNavigator(
  {
    Comments,
    Landing,
    Search
  },
  {
    initialRouteName: 'Landing'
  }
)

const Container = createAppContainer(Navigator)

export const WoWdb = () => (
  <>
    <StatusBar barStyle="light-content" />
    <Container />
  </>
)
