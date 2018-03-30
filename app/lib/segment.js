import {
  SEGMENT_ANDROID_WRITE_KEY,
  SEGMENT_IOS_WRITE_KEY
} from 'react-native-dotenv'

Expo.Segment.initialize({
  androidWriteKey: SEGMENT_ANDROID_WRITE_KEY,
  iosWriteKey: SEGMENT_IOS_WRITE_KEY
})

export default {
  track(event) {
    if (__DEV__) {
      return
    }

    Expo.Segment.track(event)
  },
  trackWithProperties(event, properties) {
    if (__DEV__) {
      return
    }

    Expo.Segment.trackWithProperties(event, properties)
  },
  screen(name) {
    if (__DEV__) {
      return
    }

    Expo.Segment.screen(name)
  },
  screenWithProperties(name, properties) {
    if (__DEV__) {
      return
    }

    Expo.Segment.screenWithProperties(name, properties)
  }
}
