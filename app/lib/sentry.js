import { SENTRY_DSN } from 'react-native-dotenv'

import Sentry from 'sentry-expo'

Sentry.config(SENTRY_DSN).install()

export default {
  captureException(err) {
    Sentry.captureException(err)
  }
}
