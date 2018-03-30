import { SENTRY_DSN } from 'react-native-dotenv'

import Sentry from 'sentry-expo'

Sentry.config(SENTRY_DSN).install()
