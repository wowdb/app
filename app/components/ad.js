import { ADMOB_APP_ID_ANDROID, ADMOB_APP_ID_IOS } from 'react-native-dotenv'

import React, { Component } from 'react'
import { Platform } from 'react-native'
import firebase from 'react-native-firebase'

const admob = firebase.admob

const appId = Platform.select({
  android: ADMOB_APP_ID_ANDROID,
  ios: ADMOB_APP_ID_IOS
})

admob().initialize(appId)

export default class Ad extends Component {
  render() {
    const {
      id,
      keywords = ['world of warcraft', 'wowhead', 'mmorpg', 'blizzard'],
      size = 'SMART_BANNER'
    } = this.props

    const { AdRequest, Banner } = admob

    const request = new AdRequest()

    keywords.forEach(keyword => request.addKeyword(keyword))

    return <Banner request={request.build()} size={size} unitId={id} />
  }
}
