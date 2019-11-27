import { SENTRY_DSN } from 'react-native-dotenv'

import 'react-native-gesture-handler'

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'

import { WoWdb } from './src'

Sentry.init({
  dsn: SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production'
})

AppRegistry.registerComponent('WoWdb', () => WoWdb)
