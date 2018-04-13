import { SENTRY_DSN } from 'react-native-dotenv'

import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'

Sentry.config(SENTRY_DSN, {
  deactivateStacktraceMerging: Platform.OS === 'android'
}).install()

export default {
  captureException(err) {
    if (__DEV__) {
      return
    }

    Sentry.captureException(err)
  }
}
