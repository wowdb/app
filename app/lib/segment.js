import { SEGMENT_ANDROID_KEY, SEGMENT_IOS_KEY } from 'react-native-dotenv'

import { Platform } from 'react-native'
import Segment from 'react-native-analytics-segment-io'

const key = Platform.OS === 'android' ? SEGMENT_ANDROID_KEY : SEGMENT_IOS_KEY

Segment.setup(key, {
  debug: __DEV__,
  trackApplicationLifecycleEvents: true
})

export default {
  track(event, properties) {
    if (__DEV__) {
      return
    }

    Segment.track(event, properties)
  },
  screen(name, properties) {
    if (__DEV__) {
      return
    }

    Segment.screen(name, properties)
  }
}
