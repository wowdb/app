import { Alert } from 'react-native'

export default class Dialog {
  static alert(message) {
    const button = {
      text: 'Okay'
    }

    Alert.alert(null, message, [button])
  }
}
