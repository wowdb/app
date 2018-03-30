import { SENTRY_DSN } from 'react-native-dotenv'

import Sentry from 'sentry-expo'

Sentry.config(SENTRY_DSN).install()

export default {
  captureException(err) {
    if (__DEV__) {
      return
    }

    Sentry.captureException(err)
  }
}
