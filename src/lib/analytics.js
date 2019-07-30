import analytics from '@segment/analytics-react-native'
import { Platform } from 'react-native'
import { SEGMENT_KEY_ANDROID, SEGMENT_KEY_IOS } from 'react-native-dotenv'

class Analytics {
  constructor() {
    const key = Platform.select({
      android: SEGMENT_KEY_ANDROID,
      ios: SEGMENT_KEY_IOS
    })

    analytics.setup(key)
  }

  async screen(name, properties = {}) {
    return analytics.screen(name, properties)
  }

  async track(event, properties = {}) {
    return analytics.track(event, properties)
  }
}

export default new Analytics()
