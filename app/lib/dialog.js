import { Alert } from 'react-native'

export default {
  alert(message) {
    const button = {
      text: 'Okay'
    }

    Alert.alert(null, message, [button])
  }
}
