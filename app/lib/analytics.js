import firebase from 'react-native-firebase'

export default {
  track(event, properties) {
    if (__DEV__) {
      return
    }

    firebase.analytics().logEvent(event, properties)
  },
  screen(name) {
    if (__DEV__) {
      return
    }

    firebase.analytics().setCurrentScreen(name)
  }
}
