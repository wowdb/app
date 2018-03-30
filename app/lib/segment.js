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
    Expo.Segment.track(event)
  },
  trackWithProperties(event, properties) {
    Expo.Segment.trackWithProperties(event, properties)
  },
  screen(name) {
    Expo.Segment.screen(name)
  },
  screenWithProperties(name, properties) {
    Expo.Segment.screenWithProperties(name, properties)
  }
}
